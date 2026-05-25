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
     * @param {number} [options.activeRadius=2]   Chebyshev radius of chunks kept alive around player.
     *                                             2 = 5×5 grid, 3 = 7×7 grid.
     * @param {number} [options.worldChunksWidth]  Total world width in chunks (optional, for bounds clamping).
     * @param {number} [options.worldChunksHeight] Total world height in chunks (optional, for bounds clamping).
     */
    constructor(options = {}) {
        this.activeRadius      = options.activeRadius      ?? 2;
        this.worldChunksWidth  = options.worldChunksWidth  ?? Infinity;
        this.worldChunksHeight = options.worldChunksHeight ?? Infinity;

        /** All known chunks, keyed by Chunk.makeKey(cx, cy). */
        this._chunks = new Map();

        /** Keys of chunks currently in the active set. */
        this._activeKeys = new Set();

        /** Last chunk the player was in — used to skip redundant sweeps. */
        this._lastPlayerChunkX = null;
        this._lastPlayerChunkY = null;

        // Callbacks — replace these after construction.
        /** Called with a Chunk instance when it enters the active set. */
        this.onChunkLoad   = (_chunk) => {};
        /** Called with a Chunk instance when it leaves the active set. */
        this.onChunkUnload = (_chunk) => {};
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
            this._chunks.set(key, new Chunk(chunkX, chunkY));
        }
        return this._chunks.get(key);
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

        // Unload chunks that are no longer desired
        for (const key of this._activeKeys) {
            if (!desiredKeys.has(key)) {
                this._activeKeys.delete(key);
                const chunk = this._chunks.get(key);
                if (chunk) {
                    this.onChunkUnload(chunk);
                }
            }
        }

        // Load chunks that are newly desired
        for (const key of desiredKeys) {
            if (!this._activeKeys.has(key)) {
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
