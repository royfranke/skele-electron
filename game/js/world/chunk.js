/**
 * Chunk
 *
 * Authoritative data container for a fixed region of the world.
 * A chunk is CHUNK_SIZE x CHUNK_SIZE tiles.
 * Phaser layers are NOT stored here — they live in the renderer.
 * This class is the source of truth for terrain, collision, entities,
 * and navigation data within its region.
 */

export const CHUNK_SIZE = 32; // tiles per side

export default class Chunk {

    /**
     * @param {number} chunkX  - chunk column index (world tile x / CHUNK_SIZE)
     * @param {number} chunkY  - chunk row index    (world tile y / CHUNK_SIZE)
     */
    constructor(chunkX, chunkY) {
        this.chunkX = chunkX;
        this.chunkY = chunkY;

        // World-space tile origin of this chunk
        this.tileOriginX = chunkX * CHUNK_SIZE;
        this.tileOriginY = chunkY * CHUNK_SIZE;

        // Terrain tile indices — one flat array, row-major.
        // Index via: terrain[y * CHUNK_SIZE + x]  (local coords 0..CHUNK_SIZE-1)
        this.terrain = new Uint16Array(CHUNK_SIZE * CHUNK_SIZE);

        // Visual layer tile indices stored independent of Phaser.
        // Ground uses 0 as blank (matches current exterior ground fill).
        // Edge / Wall / Roof use -1 as blank (matches createBlankLayer default).
        this.edgeTiles = new Int16Array(CHUNK_SIZE * CHUNK_SIZE).fill(-1);
        this.wallTiles = new Int16Array(CHUNK_SIZE * CHUNK_SIZE).fill(-1);
        this.roofTiles = new Int16Array(CHUNK_SIZE * CHUNK_SIZE).fill(-1);

        // Collision grid — 1 = blocked, 0 = walkable.
        // Kept separate from terrain so navigation can be computed
        // without knowing tile visual data.
        this.collision = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE);

        // Ground type string per tile (e.g. 'GRASS', 'CEMENT').
        // Sparse: only set where non-default. null = inherit default.
        this.groundTypes = {};

        // Entity metadata list.
        // Each entry is a plain object:
        // { kind, slug, localX, localY, ...params }
        // kind examples: object, item, plant, tree, vehicle, npc
        this.entities = [];

        // Lifecycle flags
        this.loaded    = false;  // data has been populated
        this.dirty     = false;  // data has been modified since last save
        this.rendered  = false;  // a Phaser layer currently exists for this chunk
    }

    // ─── Key ──────────────────────────────────────────────────────────────────

    /** Stable string key used by ChunkManager maps. */
    get key() {
        return Chunk.makeKey(this.chunkX, this.chunkY);
    }

    static makeKey(chunkX, chunkY) {
        return `${chunkX}_${chunkY}`;
    }

    // ─── Coordinate helpers ───────────────────────────────────────────────────

    /** Convert world tile coords to chunk-local coords. Returns null if out of range. */
    worldToLocal(worldX, worldY) {
        const lx = worldX - this.tileOriginX;
        const ly = worldY - this.tileOriginY;
        if (lx < 0 || ly < 0 || lx >= CHUNK_SIZE || ly >= CHUNK_SIZE) {
            return null;
        }
        return { x: lx, y: ly };
    }

    /** Are the given world tile coords inside this chunk? */
    contains(worldX, worldY) {
        return this.worldToLocal(worldX, worldY) !== null;
    }

    // ─── Terrain ──────────────────────────────────────────────────────────────

    /** Get tile index at world tile coords. Returns 0 if out of bounds. */
    getTile(worldX, worldY) {
        const local = this.worldToLocal(worldX, worldY);
        if (!local) return 0;
        return this.terrain[local.y * CHUNK_SIZE + local.x];
    }

    /** Set tile index at world tile coords. Marks chunk dirty. */
    setTile(worldX, worldY, tileIndex) {
        const local = this.worldToLocal(worldX, worldY);
        if (!local) return;
        this.terrain[local.y * CHUNK_SIZE + local.x] = tileIndex;
        this.dirty = true;
    }

    /** Fill a rectangular region (world tile coords) with a tile index. */
    fillTiles(worldX, worldY, width, height, tileIndex) {
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                this.setTile(worldX + dx, worldY + dy, tileIndex);
            }
        }
    }

    // ─── Layer tiles ─────────────────────────────────────────────────────────

    getLayerTile(layerName, worldX, worldY) {
        const local = this.worldToLocal(worldX, worldY);
        if (!local) {
            return layerName === 'ground' ? 0 : -1;
        }

        const index = local.y * CHUNK_SIZE + local.x;
        switch (layerName) {
            case 'ground':
                return this.terrain[index];
            case 'edge':
                return this.edgeTiles[index];
            case 'wall':
                return this.wallTiles[index];
            case 'roof':
                return this.roofTiles[index];
            default:
                return layerName === 'ground' ? 0 : -1;
        }
    }

    setLayerTile(layerName, worldX, worldY, tileIndex) {
        const local = this.worldToLocal(worldX, worldY);
        if (!local) return;

        const index = local.y * CHUNK_SIZE + local.x;
        switch (layerName) {
            case 'ground':
                this.terrain[index] = tileIndex;
                break;
            case 'edge':
                this.edgeTiles[index] = tileIndex;
                break;
            case 'wall':
                this.wallTiles[index] = tileIndex;
                break;
            case 'roof':
                this.roofTiles[index] = tileIndex;
                break;
            default:
                return;
        }
        this.dirty = true;
    }

    // ─── Collision ────────────────────────────────────────────────────────────

    /** Returns true if world tile coord is walkable. */
    isWalkable(worldX, worldY) {
        const local = this.worldToLocal(worldX, worldY);
        if (!local) return false;
        return this.collision[local.y * CHUNK_SIZE + local.x] === 0;
    }

    /** Mark a world tile coord as blocked (1) or walkable (0). */
    setCollision(worldX, worldY, blocked) {
        const local = this.worldToLocal(worldX, worldY);
        if (!local) return;
        this.collision[local.y * CHUNK_SIZE + local.x] = blocked ? 1 : 0;
        this.dirty = true;
    }

    // ─── Ground types ─────────────────────────────────────────────────────────

    /** Get the ground type string at world tile coords. Returns null if not set. */
    getGroundType(worldX, worldY) {
        return this.groundTypes[`${worldX}_${worldY}`] ?? null;
    }

    /** Set the ground type string at world tile coords. */
    setGroundType(worldX, worldY, type) {
        this.groundTypes[`${worldX}_${worldY}`] = type;
        this.dirty = true;
    }

    // ─── Entities ─────────────────────────────────────────────────────────────

    addEntity(kind, slug, localX, localY, params = {}) {
        this.entities.push({ kind, slug, localX, localY, ...params });
        this.dirty = true;
    }

    removeEntity(kind, slug, localX, localY) {
        this.entities = this.entities.filter(
            entity => !(
                entity.kind === kind &&
                entity.slug === slug &&
                entity.localX === localX &&
                entity.localY === localY
            )
        );
        this.dirty = true;
    }

    getEntities() {
        return this.entities;
    }

    getEntitiesByKind(kind) {
        return this.entities.filter(entity => entity.kind === kind);
    }

    // ─── Typed entity wrappers ───────────────────────────────────────────────

    addItem(slug, localX, localY, params = {}) {
        this.addEntity('item', slug, localX, localY, params);
    }

    removeItem(slug, localX, localY) {
        this.removeEntity('item', slug, localX, localY);
    }

    getItems() {
        return this.getEntitiesByKind('item');
    }

    addPlant(slug, localX, localY, params = {}) {
        this.addEntity('plant', slug, localX, localY, params);
    }

    removePlant(slug, localX, localY) {
        this.removeEntity('plant', slug, localX, localY);
    }

    getPlants() {
        return this.getEntitiesByKind('plant');
    }

    addTree(slug, localX, localY, params = {}) {
        this.addEntity('tree', slug, localX, localY, params);
    }

    removeTree(slug, localX, localY) {
        this.removeEntity('tree', slug, localX, localY);
    }

    getTrees() {
        return this.getEntitiesByKind('tree');
    }

    addVehicle(slug, localX, localY, params = {}) {
        this.addEntity('vehicle', slug, localX, localY, params);
    }

    removeVehicle(slug, localX, localY) {
        this.removeEntity('vehicle', slug, localX, localY);
    }

    getVehicles() {
        return this.getEntitiesByKind('vehicle');
    }

    addNpc(slug, localX, localY, params = {}) {
        this.addEntity('npc', slug, localX, localY, params);
    }

    removeNpc(slug, localX, localY) {
        this.removeEntity('npc', slug, localX, localY);
    }

    getNpcs() {
        return this.getEntitiesByKind('npc');
    }

    // ─── Serialisation ────────────────────────────────────────────────────────

    /** Produce a plain JSON-serialisable object. */
    toJSON() {
        return {
            chunkX:     this.chunkX,
            chunkY:     this.chunkY,
            terrain:    Array.from(this.terrain),
            edgeTiles:  Array.from(this.edgeTiles),
            wallTiles:  Array.from(this.wallTiles),
            roofTiles:  Array.from(this.roofTiles),
            collision:  Array.from(this.collision),
            groundTypes: this.groundTypes,
            entities:   this.entities,
        };
    }

    /** Restore state from a plain object (e.g. loaded from JSON file). */
    fromJSON(data) {
        if (data.terrain)    this.terrain.set(data.terrain);
        if (data.edgeTiles)  this.edgeTiles.set(data.edgeTiles);
        if (data.wallTiles)  this.wallTiles.set(data.wallTiles);
        if (data.roofTiles)  this.roofTiles.set(data.roofTiles);
        if (data.collision)  this.collision.set(data.collision);
        if (data.groundTypes) this.groundTypes = data.groundTypes;
        if (data.entities) {
            this.entities = data.entities;
        }
        this.loaded = true;
        this.dirty  = false;
    }
}
