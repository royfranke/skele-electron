import Chunk, { CHUNK_SIZE } from './chunk.js';

/**
 * ChunkManager
 *
 * Tracks which chunks exist, which are active (near the player),
 * and fires load/unload callbacks so the renderer and other systems
 * can react without this class knowing anything about Phaser.
 *
 * Usage:
 *
 *   const cm = new ChunkManager({ activeRadius: 2 });
 *
 *   cm.onChunkLoad   = (chunk) => renderer.spawnChunkLayer(chunk);
 *   cm.onChunkUnload = (chunk) => renderer.destroyChunkLayer(chunk);
 *
 *   // Each frame (or whenever player moves to a new chunk):
 *   cm.update(playerWorldTileX, playerWorldTileY);
 */
export default class ChunkManager {

    /**
     * @param {object} options
     * @param {number} [options.activeRadius=0]   Chebyshev radius of chunks kept alive around player.
     *                                             2 = 5×5 grid, 3 = 7×7 grid.
     * @param {number} [options.worldChunksWidth]  Total world width in chunks (optional, for bounds clamping).
     * @param {number} [options.worldChunksHeight] Total world height in chunks (optional, for bounds clamping).
     */
    constructor(options = {}) {
        this.activeRadius      = options.activeRadius      ?? 2;
        // Number of extra rings around `activeRadius` to prefetch (load data but not activate/render)
        this.prefetchExtra     = options.prefetchExtra     ?? 1;
        // Delay (ms) before actually unloading a chunk after it leaves the desired active set.
        this.unloadDelayMs     = options.unloadDelayMs     ?? 2000;
        // Maximum number of chunks to keep loaded in memory. Set to Infinity to disable.
        this.maxLoadedChunks   = options.maxLoadedChunks   ?? Infinity;
        this.worldChunksWidth  = options.worldChunksWidth  ?? Infinity;
        this.worldChunksHeight = options.worldChunksHeight ?? Infinity;

        /** All known chunks, keyed by Chunk.makeKey(cx, cy). */
        this._chunks = new Map();

        /** LRU tracking: Map preserves insertion order; oldest entry is first. */
        this._lru = new Map();

        /** Keys of chunks currently in the active set. */
        this._activeKeys = new Set();

        // Tracks keys scheduled for unload: key -> expiry timestamp
        this._pendingUnloads = new Map();

        /** Last chunk the player was in — used to skip redundant sweeps. */
        this._lastPlayerChunkX = null;
        this._lastPlayerChunkY = null;

        // Callbacks — replace these after construction.
        /** Called with a Chunk instance when it enters the active set. */
        this.onChunkLoad   = (_chunk) => {};
        /** Called with a Chunk instance when it leaves the active set. */
        this.onChunkUnload = (_chunk) => {};
        /** Called with a Chunk instance when it should be prefetched (load data but do not render). */
        this.onChunkPrefetch = (_chunk) => {};
        /** Called with a Chunk instance when it is evicted from memory. */
        this.onChunkEvict = (_chunk) => {};
    }

    // ─── Public API ───────────────────────────────────────────────────────────

    /**
     * Call this whenever the player moves (every frame is fine;
     * internally skips work if the player hasn't crossed a chunk boundary).
     *
     * @param {number} playerWorldTileX
     * @param {number} playerWorldTileY
     */
    update(playerWorldTileX, playerWorldTileY) {
        const pcx = this.worldTileToChunk(playerWorldTileX);
        const pcy = this.worldTileToChunk(playerWorldTileY);

        if (pcx === this._lastPlayerChunkX && pcy === this._lastPlayerChunkY) {
            return; // still in same chunk, no work needed
        }

        this._lastPlayerChunkX = pcx;
        this._lastPlayerChunkY = pcy;

        this._sweep(pcx, pcy);
    }

    /**
     * Check walkability at an arbitrary world tile position across all loaded chunks.
     * Returns false if the tile is in an unloaded chunk.
     */
    isWalkable(worldX, worldY) {
        const chunk = this.getChunkAtTile(worldX, worldY);
        if (!chunk || !chunk.loaded) return false;
        return chunk.isWalkable(worldX, worldY);
    }

    /**
     * Get ground type string at world tile position.
     * Returns null if chunk not loaded or type not set.
     */
    getGroundType(worldX, worldY) {
        const chunk = this.getChunkAtTile(worldX, worldY);
        if (!chunk || !chunk.loaded) return null;
        return chunk.getGroundType(worldX, worldY);
    }

    /**
     * Get terrain tile index at world tile position.
     * Returns 0 if chunk not loaded.
     */
    getTile(worldX, worldY) {
        const chunk = this.getChunkAtTile(worldX, worldY);
        if (!chunk || !chunk.loaded) return 0;
        return chunk.getTile(worldX, worldY);
    }

    /**
     * Set terrain tile index at world tile position.
     * No-op if chunk not loaded.
     */
    setTile(worldX, worldY, tileIndex) {
        const chunk = this.getChunkAtTile(worldX, worldY);
        if (!chunk) return;
        chunk.setTile(worldX, worldY, tileIndex);
    }

    getLayerTile(layerName, worldX, worldY) {
        const chunk = this.getChunkAtTile(worldX, worldY);
        if (!chunk || !chunk.loaded) {
            return layerName === 'ground' ? 0 : -1;
        }
        return chunk.getLayerTile(layerName, worldX, worldY);
    }

    setLayerTile(layerName, worldX, worldY, tileIndex) {
        const chunk = this.getChunkAtTile(worldX, worldY);
        if (!chunk) return;
        chunk.setLayerTile(layerName, worldX, worldY, tileIndex);
    }

    // ─── Chunk access ─────────────────────────────────────────────────────────

    /** Get (or create empty) chunk by chunk grid coords. */
    getChunk(chunkX, chunkY) {
        const key = Chunk.makeKey(chunkX, chunkY);
        if (!this._chunks.has(key)) {
            const c = new Chunk(chunkX, chunkY);
            this._chunks.set(key, c);
            this._touchLRU(key, c);
            this._evictIfNeeded();
            return this._chunks.get(key);
        }
        const existing = this._chunks.get(key);
        this._touchLRU(key, existing);
        return existing;
    }

    /** Get the chunk that contains a given world tile position. */
    getChunkAtTile(worldX, worldY) {
        return this.getChunk(
            this.worldTileToChunk(worldX),
            this.worldTileToChunk(worldY)
        );
    }

    /** Register a pre-built Chunk instance (e.g. loaded from JSON). */
    registerChunk(chunk) {
        this._chunks.set(chunk.key, chunk);
        this._touchLRU(chunk.key, chunk);
        this._evictIfNeeded();
    }

    /** Returns all currently active Chunk instances. */
    getActiveChunks() {
        const result = [];
        for (const key of this._activeKeys) {
            const chunk = this._chunks.get(key);
            if (chunk) result.push(chunk);
        }
        return result;
    }

    /** Returns true if a chunk is currently in the active set. */
    isChunkActive(chunkX, chunkY) {
        return this._activeKeys.has(Chunk.makeKey(chunkX, chunkY));
    }

    /** Returns all known Chunk instances (active and inactive). */
    getAllChunks() {
        return Array.from(this._chunks.values());
    }

    // ─── LRU helpers ─────────────────────────────────────────────────────────

    _touchLRU(key, chunk) {
        try {
            if (this._lru.has(key)) this._lru.delete(key);
            this._lru.set(key, { key, chunk });
        } catch (e) {}
    }

    _evictIfNeeded() {
        if (this.maxLoadedChunks === Infinity) return;
        try {
            if (this._chunks.size <= this.maxLoadedChunks) return;

            // Find eviction candidate(s): oldest in LRU that are not active, not pending unload, and not dirty.
            for (const [oldestKey, entry] of this._lru) {
                if (this._chunks.size <= this.maxLoadedChunks) break;
                if (this._activeKeys.has(oldestKey)) continue;
                if (this._pendingUnloads.has(oldestKey)) continue;
                const chunk = this._chunks.get(oldestKey);
                if (!chunk) { this._lru.delete(oldestKey); continue; }
                if (chunk.dirty) continue; // don't evict dirty chunks

                // Evict: remove from maps and notify
                this._lru.delete(oldestKey);
                this._chunks.delete(oldestKey);
                try { this.onChunkEvict(chunk); } catch (e) {}
            }
        } catch (e) {}
    }

    /**
     * Return up to `maxCount` eviction candidates in oldest-first order.
     * Candidates may be dirty — caller should decide whether to save before eviction.
     */
    getEvictionCandidates(maxCount = 1) {
        const out = [];
        for (const [key, entry] of this._lru) {
            if (out.length >= maxCount) break;
            if (this._activeKeys.has(key)) continue;
            if (this._pendingUnloads.has(key)) continue;
            const chunk = this._chunks.get(key);
            if (!chunk) continue;
            out.push({ key, chunk });
        }
        return out;
    }

    /**
     * Remove a chunk by key from the manager and invoke `onChunkEvict`.
     * Returns the removed chunk or null.
     */
    removeChunkByKey(key) {
        const chunk = this._chunks.get(key);
        if (!chunk) return null;
        try { this._lru.delete(key); } catch (e) {}
        try { this._chunks.delete(key); } catch (e) {}
        try { this.onChunkEvict(chunk); } catch (e) {}
        return chunk;
    }

    // ─── Coordinate utilities ─────────────────────────────────────────────────

    /** Convert a world tile coordinate to its chunk index. */
    worldTileToChunk(worldTile) {
        return Math.floor(worldTile / CHUNK_SIZE);
    }

    /** Convert a chunk index to the world tile origin of that chunk. */
    chunkToWorldTile(chunkIndex) {
        return chunkIndex * CHUNK_SIZE;
    }

    // ─── Internal sweep ───────────────────────────────────────────────────────

    _sweep(playerChunkX, playerChunkY) {
        const r = this.activeRadius;
        // Build the desired active set
        const desiredKeys = new Set();
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                const cx = playerChunkX + dx;
                const cy = playerChunkY + dy;
                if (!this._inWorldBounds(cx, cy)) continue;
                desiredKeys.add(Chunk.makeKey(cx, cy));
            }
        }

        // Build the desired prefetch set (active radius + prefetchExtra)
        const pr = r + this.prefetchExtra;
        const desiredPrefetch = new Set();
        for (let dy = -pr; dy <= pr; dy++) {
            for (let dx = -pr; dx <= pr; dx++) {
                const cx = playerChunkX + dx;
                const cy = playerChunkY + dy;
                if (!this._inWorldBounds(cx, cy)) continue;
                desiredPrefetch.add(Chunk.makeKey(cx, cy));
            }
        }

        const now = Date.now();

        // Schedule unloads for active chunks that are no longer in desired active set
        for (const key of Array.from(this._activeKeys)) {
            if (!desiredKeys.has(key)) {
                // If already scheduled, skip
                if (!this._pendingUnloads.has(key)) {
                    this._pendingUnloads.set(key, now + this.unloadDelayMs);
                }
            }
            else {
                // Cancel pending unload if chunk re-entered desired set
                if (this._pendingUnloads.has(key)) this._pendingUnloads.delete(key);
            }
        }

        // Perform expirations of pending unloads
        for (const [key, expiry] of Array.from(this._pendingUnloads.entries())) {
            if (desiredKeys.has(key)) { // became active again
                this._pendingUnloads.delete(key);
                continue;
            }
            if (Date.now() >= expiry) {
                this._pendingUnloads.delete(key);
                if (this._activeKeys.has(key)) {
                    this._activeKeys.delete(key);
                    const chunk = this._chunks.get(key);
                    if (chunk) this.onChunkUnload(chunk);
                }
            }
        }

        // Prefetch: ensure chunks in the prefetch ring are created and loaded (but not activated)
        for (const key of desiredPrefetch) {
            if (desiredKeys.has(key)) continue; // will be handled by activation
            // If chunk already exists, skip; otherwise create and invoke prefetch
            if (!this._chunks.has(key)) {
                const [cx, cy] = key.split('_').map(Number);
                const chunk = this.getChunk(cx, cy); // creates empty chunk
                try {
                    this.onChunkPrefetch(chunk);
                } catch (e) {}
            }
        }

        // Activate any newly desired chunks (including ones that were pending unload)
        for (const key of desiredKeys) {
            if (!this._activeKeys.has(key)) {
                // Cancel any pending unload
                if (this._pendingUnloads.has(key)) this._pendingUnloads.delete(key);
                this._activeKeys.add(key);
                const [cx, cy] = key.split('_').map(Number);
                const chunk = this.getChunk(cx, cy); // creates if absent
                this.onChunkLoad(chunk);
            }
        }
    }

    _inWorldBounds(cx, cy) {
        return cx >= 0 && cy >= 0 && cx < this.worldChunksWidth && cy < this.worldChunksHeight;
    }
}
