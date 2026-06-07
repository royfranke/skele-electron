import TILES from "../config/atlas/tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import MAP_CONFIG from "../config/map.js";
import Ground from "../handler/ground.js";
import Block from "./exterior-block.js";
import Navigator from "../navigator/navigator-manager.js";
import "../world/entity-system.js";
import BlockNode from "./exterior-block-node.js";
import KEYLIGHT from "../config/key-light.js";
import ChunkManager from "../world/chunk-manager.js";
import Chunk from "../world/chunk.js";
import { CHUNK_SIZE } from "../world/chunk.js";
import WorldDataLoader from "../world/world-data-loader.js";
import "../world/world-system.js";
import ChunkDebugUI from "../dev/chunk-debug-ui.js";
import GROUND_TYPE from "../config/atlas/ground-types.js";
import TYPE_BY_TILE_INDEX from "../config/atlas/type-by-tile-index.js";
import Shop from "../object/shop.js";

/**
 * 	Manage Exteriors (Overworld tile scenes)
 *	
 */
 export default class ExteriorManager {

    constructor(scene) {
        this.scene = scene;
        this.debug = true;
        this.useLegacySlotBlockSave = false;
        // When true, never attempt to load chunk JSONs from disk; always
        // use the in-memory/generated chunk data produced during the
        // procedural build pass.
        this.alwaysUseGenerated = false;
        // When false, do not instantiate objects from chunk entity lists.
        // Useful when procedural generation already placed objects.
        this.loadObjectsFromChunks = true;
        // Runtime object→chunk sync is enabled only after chunk streaming starts.
        this.objectChunkSyncEnabled = false;
        // True once at least one chunk has been rendered into tile layers.
        this.worldReady = false;
        this.shopHourBinders = new Map();
        this.portalIndex = [];
        this.pendingChunkFlushes = new Map();

        // Make the manager available during construction-time blueprint
        // generation so portals can register before `initialize()`/`create()`
        // completes.
        try {
            this.scene.exterior = this;
        } catch (e) {}
    }

    initialize () {
        this.lastKeyLight = null;
        this.keylight = KEYLIGHT;

        this.nav = new Navigator(this.scene);

        // World chunk system — runs in parallel with Phaser rendering.
        const worldChunksWidth  = Math.ceil(MAP_CONFIG.width  / CHUNK_SIZE);
        const worldChunksHeight = Math.ceil(MAP_CONFIG.height / CHUNK_SIZE);
        this.chunkManager = new ChunkManager({
            activeRadius:      1,
            maxLoadedChunks:   128,
            debug: this.debug,
            worldChunksWidth,
            worldChunksHeight,
        });
        this.defaultMaxLoadedChunks = this.chunkManager.maxLoadedChunks;
        this.useChunkStreamingBootstrap = this.shouldUseChunkStreamingBootstrap();
        this.worldDataLoader = new WorldDataLoader('/assets/chunks/', { slot: this.getActiveSaveSlot() });
        this.worldSystem = (window.WorldSystem) ? new window.WorldSystem(this.scene, this.worldDataLoader, { slot: this.getActiveSaveSlot(), chunkManager: this.chunkManager }) : null;
        if (this.worldSystem) {
            // Expose for quick DevTools access: `window.WorldSystemInstance.forceExportAllChunks()`
            try { window.WorldSystemInstance = this.worldSystem; } catch (e) {}
        }
        // Instantiate basic EntityManager
        try {
            const self = this;
            const spawnOpts = {
                chunkManager: this.chunkManager,
                onSpawnRuntime: (entity) => {
                    try {
                        const tileSize = MAP_CONFIG.tileSize || 16;
                        const px = (entity.worldX * tileSize) + Math.floor(tileSize/2);
                        const py = (entity.worldY * tileSize) + Math.floor(tileSize/2);
                        // Create a basic sprite for the runtime form. Use slug as texture key if available.
                        const sprite = self.scene.add.sprite(px, py, entity.slug || 'placeholder').setOrigin(0.5, 0.5);
                        // Depth by Y for simple layering
                        sprite.setDepth(py + 100);
                        return sprite;
                    } catch (err) {
                        return null;
                    }
                },
                onDespawnRuntime: (entity) => {
                    try {
                        const r = entity.runtime;
                        if (r && r.destroy) r.destroy();
                    } catch (err) {}
                }
            };

            this.entitySystem = window.EntitySystem ? new window.EntitySystem.EntityManager(this.scene, spawnOpts) : null;
            if (this.worldSystem && this.entitySystem) this.worldSystem.entityManager = this.entitySystem;
        } catch (e) { this.entitySystem = null; }
        this.pendingChunkLoads = new Set();
        this.missingChunkKeys = new Set();
        this.worldQueryMisses = {
            walkable_unloaded: 0,
            ground_unloaded: 0,
        };

        this.chunkManager.onChunkLoad   = (chunk) => {
            if (this.worldSystem) {
                try { this.worldSystem.registerChunk(chunk); } catch (e) {}
                if (chunk.dirty) { try { this.worldSystem.markDirty(chunk); } catch (e) {} }
            }
            this.handleChunkLoad(chunk);
            if (this.debug) console.log(`[ChunkManager] load   ${chunk.key}`);
        };
        this.chunkManager.onChunkPrefetch = (chunk) => {
            // Attempt to pre-load chunk data without rendering
            try { this.handleChunkPrefetch(chunk); } catch (e) { if (this.debug) console.warn('prefetch failed', e); }
        };
        this.chunkManager.onChunkEvict = (chunk) => {
            try {
                this.flushChunkOnLeave(chunk, 'evict').catch(() => {});

                // If the chunk is still rendered for any reason, clear its tiles and entities.
                if (chunk && chunk.rendered) {
                    this.unrenderChunk(chunk);
                }

                // Ensure item entities removed from registry
                try { this.unrenderChunkItemEntities(chunk); } catch (e) {}

                // Refresh collisions if necessary
                try { this.refreshChunkCollisions(); } catch (e) {}

                // Clear dirty mark in WorldSystem if present
                if (this.worldSystem && typeof this.worldSystem.clearDirtyFor === 'function') {
                    try { this.worldSystem.clearDirtyFor(chunk); } catch (e) {}
                }
            } catch (e) {
                if (this.debug) console.warn('onChunkEvict handler error', e);
            }
        };
        this.chunkManager.onChunkUnload = (chunk) => {
            this.flushChunkOnLeave(chunk, 'unload').catch(() => {});
            this.unrenderChunk(chunk);
            if (this.debug) console.log(`[ChunkManager] unload ${chunk.key}`);
        };

        // Dev UI for inspecting chunks
        try {
            if (this.debug) {
                this.devChunkUI = new ChunkDebugUI({ chunkManager: this.chunkManager, worldSystem: this.worldSystem, scene: this.scene });
            }
        } catch (e) { /* ignore in prod */ }

        // Keyboard shortcut to toggle dev UI: Ctrl+Shift+C
        try {
            window.addEventListener('keydown', (ev) => {
                try {
                    if (ev.ctrlKey && ev.shiftKey && ev.code === 'KeyC') {
                        if (this.devChunkUI && typeof this.devChunkUI.toggle === 'function') this.devChunkUI.toggle();
                    }
                } catch (e) {}
            });
        } catch (e) {}

        this.lastBlock = {x: 0, y: 0};
        this.lastTile = {x: 0, y: 0};

        this.map = this.scene.make.tilemap({
            tileWidth: MAP_CONFIG.tileSize,
            tileHeight: MAP_CONFIG.tileSize,
            width: MAP_CONFIG.width,
            height: MAP_CONFIG.height,
        });

        const ground_tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0);
        const edge_tileset = this.map.addTilesetImage("edge", null, 16, 16, 0, 0);
        const wall_tileset = this.map.addTilesetImage("wall", null, 16, 16, 0, 0);
        const roof_tileset = this.map.addTilesetImage("roof", null, 16, 16, 0, 0);
        
        this.groundLayer = this.map.createBlankLayer("Ground", ground_tileset).fill(0).setDepth(2);
        this.edgeLayer = this.map.createBlankLayer("Edge",edge_tileset).setDepth(3);
        this.wallLayer = this.map.createBlankLayer("Wall", wall_tileset).setDepth(4);
        this.roofLayer = this.map.createBlankLayer("Roof", roof_tileset).setDepth(1000);
        // Per-chunk layer bookkeeping (basic create/destroy orchestration)
        this.chunkLayers = new Map(); // key -> { created: true }

        // Whether chunk JSON files were detected on disk. Populated by
        // `detectChunkFiles()` which should be awaited before `create()`.
        this.chunkFilesExist = null;
        if (!this.useChunkStreamingBootstrap) {
            this.buildMap();
        }
    }

    /**
     * Async check for whether saved chunk JSONs exist for the starting
     * player position. Sets `this.chunkFilesExist` to true/false.
     * Reasonable heuristic: check the chunk containing the player's start tile.
     */
    async detectChunkFiles() {
        try {
            if (!this.worldDataLoader) { this.chunkFilesExist = false; return false; }

            const pos = this.scene?.slot?.POSITION ?? null;
            const startX = pos?.X ?? 0;
            const startY = pos?.Y ?? 0;

            // Compute chunk coords
            const cx = Math.floor(startX / CHUNK_SIZE);
            const cy = Math.floor(startY / CHUNK_SIZE);

            // Create a temporary Chunk instance and ask the loader to populate it.
            const temp = new Chunk(cx, cy);
            const ok = await this.worldDataLoader.loadChunk(temp);
            this.chunkFilesExist = !!ok;
            return this.chunkFilesExist;
        } catch (e) {
            this.chunkFilesExist = false;
            return false;
        }
    }

    shouldUseChunkStreamingBootstrap () {
        if (MAP_CONFIG.useChunkStreamingBootstrap === true) {
            return true;
        }

        if (MAP_CONFIG.useChunkStreamingBootstrap === false) {
            return false;
        }

        // Auto-enable only for very large maps unless explicitly disabled.
        // 1024x1024 tiles = 1,048,576 tiles.
        const mapTileCount = MAP_CONFIG.width * MAP_CONFIG.height;
        return mapTileCount >= 1048576;
    }

    buildMap () {
        if (this.debug) {
            console.log('Building map');
        }
        
        this.ground = new Ground(this.groundLayer, this.edgeLayer);
        const self = this;
        const blocks = new Array(MAP_CONFIG.sectionsHeight).fill().map(() => new Array(this.map.sectionsWidth).fill(0));

        MAP_CONFIG.blocks.forEach(function (block, index) {
            blocks[block.y][block.x] = new Block(self.scene, block); /// Backwards on purpose to not require array flip
            
        });

        MAP_CONFIG.propertyLines.forEach(function (prop, index) {
            blocks[prop.block.y][prop.block.x].addPropertyLine(prop); /// Backwards on purpose to not require array flip
            
        });
        let nodesHeight = parseInt(MAP_CONFIG.sectionsHeight + 3);
        let nodesWidth = parseInt(MAP_CONFIG.sectionsWidth + 3);
        const nodes = new Array(nodesHeight).fill().map(() => new Array(nodesWidth).fill(0));
        
        
        MAP_CONFIG.nodes.forEach(function (node, index) {
            nodes[node.y][node.x] = new BlockNode(self.scene, node); /// Backwards on purpose to not require array flip
            
            if (node.streets.n.found != 0) {
                /// Get north street coords
                
                var block_tiles = (MAP_CONFIG.blockHeight * (node.y - node.streets.n.connect))/2; /// TODO: fix
                var ways = node.streets.n.dir.trim().length;
                var two_way = ways > 1 ? node.streets.n.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.n.lanes+'LANE_'+two_way+'N_';
                var recipe = self.cook(recipe_name);
                var recipe_x = node.left;
                if (node.width != recipe.WIDTH) {
                    recipe_x = node.left + Math.ceil((node.width - recipe.WIDTH)/2);
                }

                var recipe_y = node.top - recipe.HEIGHT + 1;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);
                block_tiles = block_tiles - recipe.HEIGHT;
                if (ways == 1) {
                    for (var i=0;i<3; i++) {
                        // Increments y position for start of tile recipe by height and y of previous recipe
                        var recipe_name =  'STREET_'+ways+'WAY_'+node.streets.n.lanes+'LANE_'+node.streets.n.dir.toUpperCase()+'_';
                    
                        var recipe = self.cook(recipe_name);
                        recipe_y = recipe_y - recipe.HEIGHT;
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.HEIGHT;
                    }
                }
                for (var i=0;i<block_tiles; i++) {
                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.n.lanes+'LANE_NS_';
                    var recipe = self.cook(recipe_name);
                    recipe_y = recipe_y - recipe.HEIGHT;
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }


            if (node.streets.e.found == 0 || node.streets.e.connect == -1) {
            }
            else {
                /// Get east street coords
                var block_tiles = (MAP_CONFIG.blockWidth * (node.streets.e.connect - node.x))/2; /// TODO: fix
                var ways = node.streets.e.dir.trim().length;
                var two_way = ways > 1 ? node.streets.e.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.e.lanes+'LANE_'+two_way+'E_';
                var recipe = self.cook(recipe_name);
                var recipe_y = node.top;
                if (node.height != recipe.HEIGHT) {
                    recipe_y = node.top + Math.ceil((node.height - recipe.HEIGHT)/2);
                }

                var recipe_x = node.right;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);
                block_tiles = block_tiles - recipe.WIDTH;
                if (ways == 1) {
                    for (var i=0;i<3; i++) {
                        // Increments x position for start of tile recipe by width and x of previous recipe
                        recipe_x = recipe_x + recipe.WIDTH;

                        var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.e.lanes+'LANE_'+node.streets.e.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.WIDTH;
                    }
                }
                for (var i=0;i<block_tiles; i++) {
                    recipe_x = recipe_x + recipe.WIDTH;

                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.e.lanes+'LANE_EW_';
                    var recipe = self.cook(recipe_name);
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }
            
            if (node.streets.s.found == 0 || node.streets.s.connect == -1) {

            }
            else {
                /// Get south street coords
                var block_tiles = (MAP_CONFIG.blockHeight * (node.streets.s.connect - node.y))/2; /// TODO: fix
                var ways = node.streets.s.dir.trim().length;
                var two_way = ways > 1 ? node.streets.s.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.s.lanes+'LANE_'+two_way+'S_';
                var recipe = self.cook(recipe_name);
                
                var recipe_x = node.left;
                if (node.width != recipe.WIDTH) {
                    recipe_x = node.left + Math.ceil((node.width - recipe.WIDTH)/2);
                }

                var recipe_y = node.bottom;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);                block_tiles = block_tiles - recipe.HEIGHT;                if (ways == 1) {
                    for (var i=0;i<3; i++) {
                        // Increments y position for start of tile recipe by height and y of previous recipe
                        recipe_y = recipe_y + recipe.HEIGHT;
                        var recipe_name =  'STREET_'+ways+'WAY_'+node.streets.s.lanes+'LANE_'+node.streets.s.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.HEIGHT;
                    }
                }
                for (var i=0;i<block_tiles; i++) {
                    recipe_y = recipe_y + recipe.HEIGHT;

                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.s.lanes+'LANE_NS_';
                    var recipe = self.cook(recipe_name);
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }

            if (node.streets.w.found == 0 || node.streets.w.connect == -1) {
                //groundLayer.weightedRandomize(TILES.CURB.WEST_, node.left, node.top + 1,1, node.height - 1);
            }
            else {
                /// Get west street coords
                var block_tiles = (MAP_CONFIG.blockWidth * (node.x - node.streets.w.connect))/2; /// TODO: fix
                var ways = node.streets.w.dir.trim().length;
                var two_way = ways > 1 ? node.streets.w.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.w.lanes+'LANE_'+two_way+'W_';
                var recipe = self.cook(recipe_name);
                var recipe_y = node.top;
                if (node.height != recipe.HEIGHT) {
                    recipe_y = node.top + Math.ceil((node.height - recipe.HEIGHT)/2);
                }

                var recipe_x = node.left - recipe.WIDTH + 1;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);
                block_tiles = block_tiles - recipe.WIDTH;
                if (ways == 1) { /// One ways west
                    for (var i=0;i<3; i++) {
                        // Increments x position for start of tile recipe by width and x of previous recipe

                        var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.w.lanes+'LANE_'+node.streets.w.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        recipe_x = recipe_x - recipe.WIDTH;
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.WIDTH;
                    }
                } /// One ways end
                for (var i=0;i<block_tiles; i++) {
            
                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.w.lanes+'LANE_EW_';
                    var recipe = self.cook(recipe_name);
                    recipe_x = recipe_x - recipe.WIDTH;
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }
        });
        this.nodes = nodes;

        this.blocks = blocks;
        this.block = null;

        
    }

    buildBlock (_x,_y) {
        this.blocks[_y][_x].buildProperties();
        this.blocks[_y][_x].buildObjects();
    }

    create () {
        if (this.useChunkStreamingBootstrap) {
            this.ground = new Ground(this.groundLayer, this.edgeLayer);
            this.ground.initializeTiles(this.groundLayer, this.scene, this.edgeLayer);
            this.setMouseInput();
            this.bootstrapPortalIndexFromDisk();
            this.beginChunkStreaming();
            return;
        }

        // If chunk files were detected on startup, skip the build/generation
        // and rely on the saved chunk JSONs to populate the world.
        if (this.chunkFilesExist === true) {
            if (this.debug) console.log('Detected existing chunk files — skipping generation');
            this.ground = new Ground(this.groundLayer, this.edgeLayer);
            this.ground.initializeTiles(this.groundLayer, this.scene, this.edgeLayer);
            this.setMouseInput();
            this.bootstrapPortalIndexFromDisk();
            this.beginChunkStreaming();
            return;
        }

        // During the initial procedural generation/snapshot/export pass we must
        // keep all generated chunks resident; otherwise LRU eviction can drop
        // chunks before they are exported, causing missing objects/tiles.
        this.enterGenerationPersistenceMode();

        self = this;
        MAP_CONFIG.blocks.forEach(function (block, index) {
            self.setCorners(block);
            self.buildBlock(block.x, block.y); 
        });
        const objectManager = this.scene.manager.objectManager;

        MAP_CONFIG.nodes.forEach(function (node, index) {
            self.nodes[node.y][node.x].buildObjects(objectManager); 
        });
        this.ground.initializeTiles(this.groundLayer, this.scene, this.edgeLayer);
        this.setMouseInput();

        // Snapshot all Phaser-painted tiles into chunk data now that the
        // build pass is complete.  This is a one-time O(width*height) read.
        this.snapshotToChunks();

        // Rebuild object entities for every populated chunk from the live
        // runtime registry right before export. This ensures chunks don't
        // miss objects if any were created after tile snapshotting.
        this.snapshotAllChunkObjectsFromRuntime();

        // Build and persist a global portal index file so interior scenes
        // can resolve exterior return coordinates without loading chunks.
        this.savePortalIndexFile();

        // After generating chunks from the procedural build, persist them
        // to disk so subsequent loads (e.g. after returning from an interior)
        // will read from the saved chunk files instead of re-generating.
        const finalizeGeneration = () => {
            this.exitGenerationPersistenceMode();
            // Switch rendering over to chunk streaming.
            this.beginChunkStreaming();
        };

        try {
            if (this.worldSystem && typeof this.worldSystem.forceExportAllChunks === 'function') {
                // Only attempt export when running in an environment that supports saving.
                if (this.worldDataLoader && this.worldDataLoader._canUseElectronApi) {
                    this.worldSystem.forceExportAllChunks({ onlyDirty: false })
                        .then((res) => {
                            if (this.debug) console.log('[WorldSystem] forced export complete', res);
                        })
                        .catch(err => { if (this.debug) console.warn('forceExportAllChunks failed', err); })
                        .finally(() => {
                            finalizeGeneration();
                        });
                    return;
                }
            }
        } catch (e) {}

        finalizeGeneration();
    }

    enterGenerationPersistenceMode () {
        if (!this.chunkManager) return;
        this.chunkManager.maxLoadedChunks = Infinity;
    }

    exitGenerationPersistenceMode () {
        if (!this.chunkManager) return;
        this.chunkManager.maxLoadedChunks = this.defaultMaxLoadedChunks;
        try {
            if (this.worldSystem && typeof this.worldSystem.evictIfNeeded === 'function') {
                this.worldSystem.evictIfNeeded().catch(() => {});
            }
        } catch (e) {}
    }

    clearPortalIndex () {
        this.portalIndex = [];
    }

    registerPortalIndexEntry (portal = {}) {
        if (portal == null || typeof portal !== 'object') {
            return null;
        }

        const portalId = portal.portalId ?? null;
        const worldX = portal?.world?.x ?? portal?.x ?? null;
        const worldY = portal?.world?.y ?? portal?.y ?? null;

        const entry = {
            portalId,
            room_id: portal.room_id,
            world: (worldX != null && worldY != null) ? { x: worldX, y: worldY } : null,
            x: worldX,
            y: worldY,
            facing: portal.facing ?? 'N',
            slug: portal.slug ?? null,
            address: portal.address ?? null,
            return: portal.return ?? null,
            objectSlug: portal.objectSlug ?? null,
            index: this.portalIndex.length,
        };

        this.portalIndex.push(entry);

        return entry;
    }

    rebuildPortalIndexFromObjects () {
        const objectRegistry = this.scene?.manager?.objectManager?.registry?.registry;
        if (!objectRegistry || typeof objectRegistry !== 'object') {
            return 0;
        }

        const rebuilt = [];
        const seen = new Set();

        Object.entries(objectRegistry).forEach(([key, objects]) => {
            if (!Array.isArray(objects)) {
                return;
            }

            objects.forEach(obj => {
                const portal = obj?.portal;
                if (!portal) {
                    return;
                }

                const worldX = portal?.world?.x ?? obj?.tile_x ?? null;
                const worldY = portal?.world?.y ?? obj?.tile_y ?? null;
                const portalId = portal?.portalId ?? (worldX != null && worldY != null ? `ext:${portal?.room_id ?? 'unknown'}:${worldX}:${worldY}` : null);
                const dedupeKey = `${portalId ?? 'no-id'}:${worldX ?? 'x'}:${worldY ?? 'y'}`;
                if (seen.has(dedupeKey)) {
                    return;
                }

                seen.add(dedupeKey);
                rebuilt.push({
                    portalId,
                    room_id: portal?.room_id,
                    world: (worldX != null && worldY != null) ? { x: worldX, y: worldY } : null,
                    x: worldX,
                    y: worldY,
                    facing: portal?.facing ?? 'N',
                    slug: portal?.slug ?? obj?.info?.slug ?? null,
                    address: portal?.address ?? null,
                    return: portal?.return ?? null,
                    objectSlug: obj?.info?.slug ?? null,
                    sourceKey: key,
                });
            });
        });

        this.portalIndex = rebuilt;
        return this.portalIndex.length;
    }

    async bootstrapPortalIndexFromDisk () {
        try {
            if (!this.worldDataLoader || typeof this.worldDataLoader.loadPortalIndex !== 'function') {
                return false;
            }

            const loaded = await this.worldDataLoader.loadPortalIndex();
            if (!loaded || !Array.isArray(loaded.portals) || loaded.portals.length === 0) {
                return false;
            }

            this.portalIndex = loaded.portals.slice();
            return true;
        } catch (e) {
            if (this.debug) {
                console.warn('[Exterior] bootstrapPortalIndexFromDisk failed', e);
            }
            return false;
        }
    }

    /**
     * Walk every tile in the ground and wall layers once and populate the
     * ChunkManager so chunk data mirrors the Phaser state.
     * Terrain = groundLayer tile index.
     * Collision = any non-empty wallLayer tile (matches existing Phaser collision setup).
     */
    snapshotToChunks () {
        const w = MAP_CONFIG.width;
        const h = MAP_CONFIG.height;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                // Terrain
                const groundTile = this.groundLayer.getTileAt(x, y);
                const groundIndex = (groundTile && groundTile.index != null) ? groundTile.index : 0;
                this.chunkManager.setLayerTile('ground', x, y, groundIndex);
                const groundType = TYPE_BY_TILE_INDEX[groundIndex] || 'VOID';
                const chunk = this.chunkManager.getChunkAtTile(x, y);
                chunk.setGroundType(x, y, groundType);

                // Edge / Wall / Roof
                const edgeTile = this.edgeLayer.getTileAt(x, y);
                const edgeIndex = (edgeTile && edgeTile.index != null) ? edgeTile.index : -1;
                this.chunkManager.setLayerTile('edge', x, y, edgeIndex);

                const wallTile = this.wallLayer.getTileAt(x, y);
                const wallIndex = (wallTile && wallTile.index != null) ? wallTile.index : -1;
                this.chunkManager.setLayerTile('wall', x, y, wallIndex);

                const roofTile = this.roofLayer.getTileAt(x, y);
                const roofIndex = (roofTile && roofTile.index != null) ? roofTile.index : -1;
                this.chunkManager.setLayerTile('roof', x, y, roofIndex);

                // Collision — any tile present on the wall layer = blocked
                if (wallIndex > -1) {
                    const chunk = this.chunkManager.getChunkAtTile(x, y);
                    chunk.setCollision(x, y, true);
                }
            }
        }

        // Mark all chunks as loaded now that data is populated
        this.chunkManager.getAllChunks().forEach(chunk => {
            chunk.loaded = true;
            chunk.dirty  = false;
            try { chunk.origin = chunk.origin || 'generated'; } catch (e) {}
        });

        // Snapshot placed world objects into chunks (slug, variety, params, items)
        try {
            const objectRegistry = this.scene?.manager?.objectManager?.registry?.registry;
            if (objectRegistry) {
                Object.entries(objectRegistry).forEach(([key, objects]) => {
                    if (!Array.isArray(objects)) return;
                    const parts = key.split("_");
                    const keyX = Number(parts[0]);
                    const keyY = Number(parts[1]);
                    objects.forEach(obj => {
                        try {
                            const worldX = Number.isFinite(obj?.tile_x) ? obj.tile_x : keyX;
                            const worldY = Number.isFinite(obj?.tile_y) ? obj.tile_y : keyY;
                            if (!Number.isFinite(worldX) || !Number.isFinite(worldY)) return;

                            const chunk = this.chunkManager.getChunkAtTile(worldX, worldY);
                            if (!chunk) return;
                            const local = chunk.worldToLocal(worldX, worldY);
                            if (!local) return;

                            const params = {};
                            if (obj.state && obj.state.name) params.state = obj.state.name;
                            if (obj.portal) {
                                const world = {
                                    x: worldX,
                                    y: worldY,
                                };
                                const roomId = obj.portal.room_id;
                                const portalId = obj.portal.portalId ?? `ext:${roomId}:${worldX}:${worldY}`;
                                const returnPortal = obj.portal.return ?? {
                                    ROOM: -1,
                                    X: worldX,
                                    Y: worldY,
                                    FACING: 'S',
                                    SLUG: obj.info.slug,
                                };

                                params.portal = {
                                    room_id: roomId,
                                    x: obj.portal.x,
                                    y: obj.portal.y,
                                    facing: obj.portal.facing ?? 'N',
                                    world,
                                    return: returnPortal,
                                    slug: obj.portal.slug ?? obj.info.slug,
                                    portalId,
                                    address: obj.portal.address ?? null,
                                };
                            }
                            if (obj.services) params.services = obj.services;
                            if (Array.isArray(obj.announcements) && obj.announcements.length > 0) params.announcements = obj.announcements;

                            // Record variety if present
                            const variety = (typeof obj.variety === 'number') ? obj.variety : undefined;

                            // Serialize any chest/items attached to the object (if present)
                            const items = this.serializeChunkItemContents(obj.items ?? []);

                            // Capture visual flags: depth and flips
                            const depth = (obj.sprite && typeof obj.sprite.depth !== 'undefined') ? obj.sprite.depth : undefined;
                            const flipX = (obj.sprite && obj.sprite.flipX) ? true : false;
                            const flipY = (obj.sprite && obj.sprite.flipY) ? true : false;

                            // Avoid adding duplicate object entities at same local coord and slug
                            const existingObjs = (typeof chunk.getEntitiesByKind === 'function') ? chunk.getEntitiesByKind('object') : chunk.entities.filter(e => e.kind === 'object');
                            const duplicate = Array.isArray(existingObjs) && existingObjs.some(e => e.localX === local.x && e.localY === local.y && e.slug === obj.info.slug);
                            if (!duplicate) {
                                chunk.addEntity('object', obj.info.slug, local.x, local.y, {
                                    variety: variety,
                                    params: params,
                                    items: items,
                                    depth: depth,
                                    flipX: flipX,
                                    flipY: flipY,
                                });

                                // Phase 2: add a portal index entity for fast global portal queries.
                                // We intentionally do not render this kind; it is query metadata only.
                                if (params.portal && params.portal.portalId) {
                                    const existingPortals = (typeof chunk.getEntitiesByKind === 'function') ? chunk.getEntitiesByKind('portal') : chunk.entities.filter(e => e.kind === 'portal');
                                    const portalDuplicate = Array.isArray(existingPortals) && existingPortals.some(e => e.portalId === params.portal.portalId);
                                    if (!portalDuplicate) {
                                        chunk.addEntity('portal', params.portal.slug ?? obj.info.slug, local.x, local.y, {
                                            portalId: params.portal.portalId,
                                            room_id: params.portal.room_id,
                                            x: params.portal.x,
                                            y: params.portal.y,
                                            facing: params.portal.facing,
                                            world: params.portal.world,
                                            return: params.portal.return,
                                            address: params.portal.address,
                                            objectSlug: obj.info.slug,
                                        });
                                    }
                                }
                            } else if (this.debug) {
                                console.warn(`[Exterior] skipping duplicate object entity ${obj.info.slug} at ${worldX},${worldY} -> chunk ${chunk.key}`);
                            }
                        } catch (e) {}
                    });
                });
            }
        } catch (e) {}

        

        if (this.debug) {
            console.log(`[ChunkManager] snapshot complete — ${this.chunkManager.getAllChunks().length} chunks populated`);
        }
    }

    beginChunkStreaming () {
        this.clearRenderedLayers();
        this.refreshChunkCollisions();
        this.objectChunkSyncEnabled = true;
        this.worldReady = false;

        const standingTile = this.scene.player?.standingTile;
        const startX = standingTile?.x ?? this.scene.player?.action?.actionTile?.x ?? 0;
        const startY = standingTile?.y ?? this.scene.player?.action?.actionTile?.y ?? 0;

        this.chunkManager.update(startX, startY);
    }

    handleChunkLoad (chunk) {
        const debug = !!this.debug;
        if (debug) console.log(`[Exterior] handleChunkLoad ${chunk.key} loaded=${!!chunk.loaded} rendered=${!!chunk.rendered}`);

        // If configured to always use generated data, skip any attempts to
        // load chunk JSONs from disk and render the chunk directly. Ensure
        // the chunk is marked `loaded` so `renderChunk` proceeds.
        if (this.alwaysUseGenerated) {
            if (!chunk.loaded) {
                chunk.loaded = true;
                try { chunk.origin = chunk.origin || 'generated'; } catch (e) {}
            }
            this.renderChunk(chunk);
            return;
        }

        if (!this.useChunkStreamingBootstrap) {
            // If chunk files exist (we skipped generation), attempt to load
            // the chunk data from disk before rendering. Otherwise render
            // from in-memory/generated data.
            if (!chunk.loaded && this.worldDataLoader != null) {
                if (debug) console.log(`[Exterior] will attempt loadAndRenderChunk ${chunk.key}`);
                this.loadAndRenderChunk(chunk);
            } else {
                if (debug) console.log(`[Exterior] will renderChunk ${chunk.key}`);
                this.renderChunk(chunk);
            }
            return;
        }

        if (debug) console.log(`[Exterior] bootstrap: loadAndRenderChunk ${chunk.key}`);
        this.loadAndRenderChunk(chunk);
    }

    async loadAndRenderChunk (chunk) {
        if (!chunk || chunk.rendered) {
            return;
        }

        if (chunk.loaded) {
            if (this.chunkManager.isChunkActive(chunk.chunkX, chunk.chunkY)) {
                this.renderChunk(chunk);
            }
            return;
        }

        if (this.pendingChunkLoads.has(chunk.key) || this.missingChunkKeys.has(chunk.key)) {
            return;
        }

        this.pendingChunkLoads.add(chunk.key);

        let loaded = false;
        if (this.worldDataLoader != null) {
            loaded = await this.worldDataLoader.loadChunk(chunk);
        }

        this.pendingChunkLoads.delete(chunk.key);

        if (!loaded) {
            this.missingChunkKeys.add(chunk.key);
            if (this.debug) {
                console.warn(`[ChunkManager] missing chunk data for ${chunk.key}`);

                // Inspect whether this chunk has any in-memory/generated tiles
                try {
                    let hasGeneratedData = false;
                    const ox = chunk.tileOriginX;
                    const oy = chunk.tileOriginY;
                    for (let ly = 0; ly < CHUNK_SIZE && !hasGeneratedData; ly++) {
                        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
                            const wx = ox + lx;
                            const wy = oy + ly;
                            if (wx < 0 || wy < 0 || wx >= MAP_CONFIG.width || wy >= MAP_CONFIG.height) continue;
                            const g = chunk.getLayerTile('ground', wx, wy);
                            const e = chunk.getLayerTile('edge', wx, wy);
                            const w = chunk.getLayerTile('wall', wx, wy);
                            const r = chunk.getLayerTile('roof', wx, wy);
                            if ((g && g !== 0) || (e != null && e !== -1) || (w != null && w !== -1) || (r != null && r !== -1)) {
                                hasGeneratedData = true;
                                break;
                            }
                        }
                    }

                    console.log(`[Exterior] missing chunk ${chunk.key} — hasGeneratedData=${hasGeneratedData} origin=${chunk.origin||'unknown'}`);
                    if (hasGeneratedData && this.chunkManager.isChunkActive(chunk.chunkX, chunk.chunkY)) {
                        console.log(`[Exterior] fallback: would render generated data for ${chunk.key} (not auto-rendering to preserve current flow)`);
                    }
                } catch (e) {
                    if (this.debug) console.warn('Error while inspecting missing chunk data', e);
                }
            }
            return;
        }

        if (this.debug) console.log(`[Exterior] chunk ${chunk.key} loaded from file`);
        if (this.chunkManager.isChunkActive(chunk.chunkX, chunk.chunkY)) {
            this.renderChunk(chunk);
        }
    }

    async handleChunkPrefetch (chunk) {
        if (!chunk || chunk.loaded) return;
        // If we force generated-only mode, skip any prefetch/load attempts.
        if (this.alwaysUseGenerated) return;
        if (this.pendingChunkLoads.has(chunk.key) || this.missingChunkKeys.has(chunk.key)) return;

        this.pendingChunkLoads.add(chunk.key);
        let loaded = false;
        if (this.worldDataLoader != null) {
            // Use loader to fetch data but do not render
            loaded = await this.worldDataLoader.loadChunk(chunk);
        }
        this.pendingChunkLoads.delete(chunk.key);

        if (!loaded) {
            this.missingChunkKeys.add(chunk.key);
            if (this.debug) console.warn(`[ChunkManager] missing chunk data for (prefetch) ${chunk.key}`);
            return;
        }
    }

    clearRenderedLayers () {
        this.groundLayer.fill(0);
        this.edgeLayer.fill(-1);
        this.wallLayer.fill(-1);
        this.roofLayer.fill(-1);
    }

    renderChunk (chunk) {
        if (!chunk || !chunk.loaded || chunk.rendered) {
            return;
        }

        // Ensure chunk layer exists (basic orchestration hook)
        try { this.createChunkLayer(chunk); } catch (e) {}

        const originX = chunk.tileOriginX;
        const originY = chunk.tileOriginY;

        let placed = 0;
        for (let ly = 0; ly < CHUNK_SIZE; ly++) {
            for (let lx = 0; lx < CHUNK_SIZE; lx++) {
                const wx = originX + lx;
                const wy = originY + ly;
                if (wx < 0 || wy < 0 || wx >= MAP_CONFIG.width || wy >= MAP_CONFIG.height) {
                    continue;
                }

                const g = chunk.getLayerTile('ground', wx, wy);
                const e = chunk.getLayerTile('edge', wx, wy);
                const w = chunk.getLayerTile('wall', wx, wy);
                const r = chunk.getLayerTile('roof', wx, wy);
                this.groundLayer.putTileAt(g, wx, wy);
                this.edgeLayer.putTileAt(e, wx, wy);
                this.wallLayer.putTileAt(w, wx, wy);
                this.roofLayer.putTileAt(r, wx, wy);
                if (g !== 0 || e !== -1 || w !== -1 || r !== -1) placed++;
            }
        }

        this.renderChunkItemEntities(chunk);

        // Spawn generic placed objects from chunk data (benches, signs, chests, etc.)
        try {
            this.renderChunkObjects(chunk);
        } catch (e) { if (this.debug) console.warn('renderChunkObjects failed', e); }

        // Spawn plants then trees (separate rendering passes)
        try {
            this.renderChunkPlants(chunk);
        } catch (e) { if (this.debug) console.warn('renderChunkPlants failed', e); }
        try {
            this.renderChunkTrees(chunk);
        } catch (e) { if (this.debug) console.warn('renderChunkTrees failed', e); }

        chunk.rendered = true;
        this.worldReady = true;
        if (this.debug) console.log(`[Exterior] rendered chunk ${chunk.key} placedTiles=${placed} origin=${chunk.origin || 'unknown'}`);
        this.refreshChunkCollisions();
    }

    isWorldReady () {
        return this.worldReady === true;
    }

    unrenderChunk (chunk) {
        if (!chunk || !chunk.rendered) {
            return;
        }
        const originX = chunk.tileOriginX;
        const originY = chunk.tileOriginY;
        const debugLog = !!this.debug;

        let cleared = 0;
        if (debugLog) {
            for (let ly = 0; ly < CHUNK_SIZE; ly++) {
                for (let lx = 0; lx < CHUNK_SIZE; lx++) {
                    const wx = originX + lx;
                    const wy = originY + ly;
                    if (wx < 0 || wy < 0 || wx >= MAP_CONFIG.width || wy >= MAP_CONFIG.height) continue;
                    const g = chunk.getLayerTile('ground', wx, wy);
                    const e = chunk.getLayerTile('edge', wx, wy);
                    const w = chunk.getLayerTile('wall', wx, wy);
                    const r = chunk.getLayerTile('roof', wx, wy);
                    if ((g && g !== 0) || (e != null && e !== -1) || (w != null && w !== -1) || (r != null && r !== -1)) cleared++;
                }
            }
            console.log(`[Exterior] unrenderChunk clearing ${cleared} tiles for ${chunk.key} origin=${chunk.origin||'unknown'} originTile=${originX},${originY}`);
        }

        for (let ly = 0; ly < CHUNK_SIZE; ly++) {
            for (let lx = 0; lx < CHUNK_SIZE; lx++) {
                const wx = originX + lx;
                const wy = originY + ly;
                if (wx < 0 || wy < 0 || wx >= MAP_CONFIG.width || wy >= MAP_CONFIG.height) {
                    continue;
                }

                this.groundLayer.putTileAt(0, wx, wy);
                this.edgeLayer.putTileAt(-1, wx, wy);
                this.wallLayer.putTileAt(-1, wx, wy);
                this.roofLayer.putTileAt(-1, wx, wy);
            }
        }

        this.unrenderChunkItemEntities(chunk);
        try { this.unrenderChunkObjects(chunk); } catch (e) {}
        try { this.unrenderChunkPlants(chunk); } catch (e) {}
        try { this.unrenderChunkTrees(chunk); } catch (e) {}

        // Destroy per-chunk layer (basic orchestration hook)
        try { this.destroyChunkLayer(chunk); } catch (e) {}

        chunk.rendered = false;
        if (debugLog) console.log(`[Exterior] finished unrenderChunk ${chunk.key} cleared=${cleared}`);
        this.refreshChunkCollisions();
    }

    renderChunkPlants (chunk) {
        if (!chunk) return;
        const plantManager = this.scene?.manager?.plantManager;
        if (plantManager == undefined || typeof chunk.getPlants !== 'function') return;
        const plants = chunk.getPlants();
        if (!Array.isArray(plants)) return;
        if (this.debug) console.log(`[Exterior] renderChunkPlants ${chunk.key} plantCount=${plants.length}`);
        plants.forEach(entity => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            if (this.debug) console.log(`[Exterior] plant entity: slug=${entity.slug} local=${entity.localX},${entity.localY} age=${entity.age_days ?? entity.params?.age_days ?? 0} world=${wx},${wy}`);
            if (!this.inWorldBounds(wx, wy)) return;

            const existingPlants = plantManager.registry.getPlants(wx, wy) ?? [];
            const duplicateKind = Array.isArray(existingPlants) && existingPlants.some(existing => existing?.info?.slug === entity.slug);
            if (duplicateKind) {
                return;
            }

            try {
                if (!plantManager.registry.placeEmpty(wx, wy) && this.debug) {
                    console.log(`[Exterior] keeping existing plants at ${wx},${wy}; adding kind=${entity.slug}`);
                }
            } catch (e) {}
            const age = entity.age_days ?? entity.params?.age_days ?? 0;
            const createdPlant = plantManager.newPlantToWorld(wx, wy, entity.slug, age);
            if (this.debug && !createdPlant) console.warn(`[Exterior] failed to create plant ${entity.slug} at ${wx},${wy}`);
            try {
                if (createdPlant && typeof createdPlant === 'object') {
                    createdPlant.stage = createdPlant.getStage();
                    if (!createdPlant.sprite) createdPlant.setTileLocation(wx, wy);
                }
            } catch (e) {}
        });
    }

    renderChunkTrees (chunk) {
        if (!chunk) return;
        const treeManager = this.scene?.manager?.treeManager;
        if (treeManager == undefined || typeof chunk.getTrees !== 'function') return;
        const trees = chunk.getTrees();
        if (!Array.isArray(trees)) return;
        trees.forEach(entity => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            if (!this.inWorldBounds(wx, wy)) return;
            try {
                if (!treeManager.registry.placeEmpty(wx, wy)) {
                    try { treeManager.registry.removeTrees(wx, wy); } catch (e) {}
                }
            } catch (e) {}
            const age = entity.age_days ?? entity.params?.age_days ?? 0;
            const createdTree = treeManager.newTreeToWorld(wx, wy, entity.slug, age);
            try {
                if (createdTree && typeof createdTree === 'object' && !createdTree.sprite) {
                    createdTree.setTileLocation(wx, wy);
                }
            } catch (e) {}
        });
    }

    unrenderChunkPlants (chunk) {
        if (!chunk) return;
        const plantManager = this.scene?.manager?.plantManager;
        if (plantManager == undefined || typeof chunk.getPlants !== 'function') return;
        const plants = chunk.getPlants();
        if (!Array.isArray(plants)) return;
        plants.forEach(entity => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            try { plantManager.registry.removePlants(wx, wy); } catch (e) {}
        });
    }

    unrenderChunkTrees (chunk) {
        if (!chunk) return;
        const treeManager = this.scene?.manager?.treeManager;
        if (treeManager == undefined || typeof chunk.getTrees !== 'function') return;
        const trees = chunk.getTrees();
        if (!Array.isArray(trees)) return;
        trees.forEach(entity => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            try { treeManager.registry.removeTrees(wx, wy); } catch (e) {}
        });
    }

    renderChunkObjects (chunk) {
        if (!chunk) return;
        // Skip restoring objects from chunks when configured to do so
        if (this.loadObjectsFromChunks === false) return;
        // If this chunk was generated (map generation already placed objects), don't re-create them
        if (chunk.origin === 'generated') return;
        const objectManager = this.scene?.manager?.objectManager;
        if (objectManager == undefined || typeof chunk.getEntitiesByKind !== 'function') return;
        const objects = chunk.getEntitiesByKind('object');
        if (!Array.isArray(objects)) return;
        const clearedTiles = new Set();
        const renderedKinds = new Set();
        if (this.debug) console.log(`[Exterior] renderChunkObjects ${chunk.key} objectCount=${objects.length}`);
        objects.forEach(entity => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            const tileKindKey = `${wx}_${wy}_${entity.slug}`;
            if (renderedKinds.has(tileKindKey)) {
                if (this.debug) {
                    console.warn(`[Exterior] skipping duplicate object kind ${entity.slug} at ${wx},${wy} in chunk ${chunk.key}`);
                }
                return;
            }
            renderedKinds.add(tileKindKey);

            // Debug: detect if multiple entity records target same world tile
            if (this.debug) {
                const conflicts = objects.filter(e => e.localX === entity.localX && e.localY === entity.localY);
                if (conflicts.length > 1) {
                    console.warn(`[Exterior] multiple object entities (${conflicts.length}) for tile ${wx},${wy} in chunk ${chunk.key}`);
                }
            }
            if (!this.inWorldBounds(wx, wy)) return;
            try {
                const tileKey = `${wx}_${wy}`;
                if (!clearedTiles.has(tileKey)) {
                    if (!objectManager.registry.placeEmpty(wx, wy)) {
                        try { objectManager.registry.removeObjects(wx, wy, { syncChunk: false }); } catch (e) {}
                    }
                    clearedTiles.add(tileKey);
                }
            } catch (e) {}

            // Recreate object in world using serialized items (if any)
            const items = entity.items ?? [];
            const created = objectManager.newObjectToWorld(wx, wy, entity.slug, items, { syncChunk: false });
            if (!created) return;

            try {
                if (entity.variety && created.setVariety) created.setVariety(entity.variety);
                if (entity.params && created.setParams) created.setParams(entity.params);
                if (Array.isArray(entity.params?.announcements)) {
                    entity.params.announcements.forEach(a => {
                        if (created.setAnnouncement) created.setAnnouncement(a.announcement, a.kind);
                    });
                }
                if (entity.params?.portal && created.setPortal) {
                    created.setPortal(entity.params.portal);
                }

                // Restore visual flags if present
                if (entity.depth != null && created.sprite && typeof created.sprite.setDepth === 'function') {
                    created.sprite.setDepth(entity.depth);
                }
                if (entity.flipX && created.sprite && typeof created.sprite.setFlipX === 'function') {
                    created.sprite.setFlipX(true);
                    if (created.sprite.body && created.info && created.info.offset && created.info.sprite) {
                        const bodyOffsetX = created.info.offset.x + (created.info.sprite.w/2);
                        const newBodyOffsetX = created.info.sprite.w - bodyOffsetX;
                        created.sprite.body.setOffset(newBodyOffsetX, created.info.offset.y + (created.info.sprite.h/2));
                    }
                }
                if (entity.flipY && created.sprite && typeof created.sprite.setFlipY === 'function') {
                    created.sprite.setFlipY(true);
                }
                // Also apply to any shell sprite
                if (created.shell_sprite) {
                    if (entity.depth != null && typeof created.shell_sprite.setDepth === 'function') created.shell_sprite.setDepth(entity.depth + 1);
                    if (entity.flipX && typeof created.shell_sprite.setFlipX === 'function') {
                        created.shell_sprite.setFlipX(true);
                        if (created.shell_sprite.body && created.info && created.info.offset && created.info.sprite) {
                            const bodyOffsetX = created.info.offset.x + (created.info.sprite.w/2);
                            const newBodyOffsetX = created.info.sprite.w - bodyOffsetX;
                            created.shell_sprite.body.setOffset(newBodyOffsetX, created.info.offset.y + (created.info.sprite.h/2));
                        }
                    }
                    if (entity.flipY && typeof created.shell_sprite.setFlipY === 'function') created.shell_sprite.setFlipY(true);
                }
            } catch (e) {}
        });

        this.rebindShopHoursForChunk(chunk);
    }

    getPropertyWorldLines(prop) {
        if (prop?.lines?.left != undefined && prop?.lines?.top != undefined) {
            return {
                left: prop.lines.left,
                top: prop.lines.top,
                width: prop.lines.width,
                height: prop.lines.height,
                right: prop.lines.right ?? (prop.lines.left + prop.lines.width),
                bottom: prop.lines.bottom ?? (prop.lines.top + prop.lines.height),
            };
        }

        const block = MAP_CONFIG.blocks.find(b => b.x == prop?.block?.x && b.y == prop?.block?.y);
        if (block == undefined) {
            return null;
        }

        const left = block.left + prop.lines.x;
        const top = block.top + prop.lines.y;
        const width = prop.lines.width;
        const height = prop.lines.height;

        return {
            left,
            top,
            width,
            height,
            right: left + width,
            bottom: top + height,
        };
    }

    chunkIntersectsRect(chunk, rect) {
        if (chunk == undefined || rect == undefined) {
            return false;
        }

        const chunkLeft = chunk.tileOriginX;
        const chunkTop = chunk.tileOriginY;
        const chunkRight = chunkLeft + CHUNK_SIZE;
        const chunkBottom = chunkTop + CHUNK_SIZE;

        return rect.left < chunkRight && rect.right > chunkLeft && rect.top < chunkBottom && rect.bottom > chunkTop;
    }

    getCommercialPropertiesInChunk(chunk) {
        if (!Array.isArray(MAP_CONFIG.propertyLines)) {
            return [];
        }

        return MAP_CONFIG.propertyLines.filter((prop) => {
            if (prop?.structure?.zoning != 'COMMERCIAL') {
                return false;
            }

            const lines = this.getPropertyWorldLines(prop);
            if (lines == null) {
                return false;
            }

            return this.chunkIntersectsRect(chunk, lines);
        });
    }

    rebindShopHoursForChunk(chunk) {
        const props = this.getCommercialPropertiesInChunk(chunk);
        if (props.length == 0) {
            return;
        }

        props.forEach((prop) => {
            const key = `${prop.block?.x ?? 'x'}_${prop.block?.y ?? 'y'}_${prop.lines?.x ?? 'lx'}_${prop.lines?.y ?? 'ly'}`;
            let shop = this.shopHourBinders.get(key);

            if (shop == undefined) {
                shop = new Shop(this.scene, prop, true, false);
                this.shopHourBinders.set(key, shop);
            }

            shop.bindHoursFromExistingObjects();
        });
    }

    unrenderChunkObjects (chunk) {
        if (!chunk) return;
        // If we didn't render objects from chunks, don't attempt to remove them on unrender
        if (this.loadObjectsFromChunks === false) return;
        if (chunk.origin === 'generated') return;
        const objectRegistry = this.scene?.manager?.objectManager?.registry;
        if (objectRegistry == undefined || typeof chunk.getEntitiesByKind !== 'function') return;
        const objects = chunk.getEntitiesByKind('object');
        if (!Array.isArray(objects)) return;
        objects.forEach(entity => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            try { objectRegistry.removeObjects(wx, wy, { syncChunk: false }); } catch (e) {}
        });
    }

    

    // Basic per-chunk layer orchestration (create/destroy only)
    createChunkLayer(chunk) {
        if (!chunk) return;
        if (this.chunkLayers.has(chunk.key)) return;
        // Placeholder bookkeeping for future pooling/per-chunk layers.
        this.chunkLayers.set(chunk.key, { created: true });
    }

    destroyChunkLayer(chunk) {
        if (!chunk) return;
        if (!this.chunkLayers.has(chunk.key)) return;
        this.chunkLayers.delete(chunk.key);
    }

    renderChunkItemEntities (chunk) {
        const itemManager = this.scene?.manager?.itemManager;
        if (itemManager == undefined || chunk == undefined || !Array.isArray(chunk.getItems?.())) {
            return;
        }

        chunk.getItems().forEach((entity) => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            if (!this.inWorldBounds(wx, wy)) {
                return;
            }

            if (itemManager.registry.getItem(wx, wy) != null) {
                return;
            }

            const contents = this.deserializeChunkEntityItems(entity.items ?? []);
            const item = itemManager.newItemToWorld(wx, wy, entity.slug, contents, { syncChunk: false });
            if (item == false) {
                return;
            }

            if (entity.params != undefined && item.setParameters != undefined) {
                item.setParameters(entity.params);
            }
            if (entity.stack != undefined && item.setStackCount != undefined) {
                item.setStackCount(entity.stack);
            }
        });
    }

    renderChunkPlantsAndTrees (chunk) {
        if (!chunk) return;

        const plantManager = this.scene?.manager?.plantManager;
        if (plantManager != undefined && typeof chunk.getPlants === 'function') {
            const plants = chunk.getPlants();
            if (Array.isArray(plants)) {
                plants.forEach(entity => {
                    const wx = chunk.tileOriginX + entity.localX;
                    const wy = chunk.tileOriginY + entity.localY;
                    if (!this.inWorldBounds(wx, wy)) return;

                    const existingPlants = plantManager.registry.getPlants(wx, wy) ?? [];
                    const duplicateKind = Array.isArray(existingPlants) && existingPlants.some(existing => existing?.info?.slug === entity.slug);
                    if (duplicateKind) {
                        return;
                    }

                    try {
                        if (!plantManager.registry.placeEmpty(wx, wy)) {
                            // Allow multiple plant kinds per tile while preventing duplicates per kind.
                        }
                    } catch (e) {}
                    const age = entity.age_days ?? entity.params?.age_days ?? 0;
                    const createdPlant = plantManager.newPlantToWorld(wx, wy, entity.slug, age);
                    try {
                        if (createdPlant && typeof createdPlant === 'object') {
                            // Ensure stage is recalculated from age (lookup) and sprite instantiated
                            createdPlant.stage = createdPlant.getStage();
                            if (!createdPlant.sprite) createdPlant.setTileLocation(wx, wy);
                        }
                    } catch (e) {}
                });
            }
        }

        const treeManager = this.scene?.manager?.treeManager;
        if (treeManager != undefined && typeof chunk.getTrees === 'function') {
            const trees = chunk.getTrees();
            if (Array.isArray(trees)) {
                trees.forEach(entity => {
                    const wx = chunk.tileOriginX + entity.localX;
                    const wy = chunk.tileOriginY + entity.localY;
                    if (!this.inWorldBounds(wx, wy)) return;
                    try {
                        if (!treeManager.registry.placeEmpty(wx, wy)) {
                            try { treeManager.registry.removeTrees(wx, wy); } catch (e) {}
                        }
                    } catch (e) {}
                    const age = entity.age_days ?? entity.params?.age_days ?? 0;
                    const createdTree = treeManager.newTreeToWorld(wx, wy, entity.slug, age);
                    // Ensure sprite exists; if registry failed to create sprite, force tile placement
                    try {
                        if (createdTree && typeof createdTree === 'object' && !createdTree.sprite) {
                            createdTree.setTileLocation(wx, wy);
                        }
                    } catch (e) {}
                });
            }
        }
    }

    unrenderChunkItemEntities (chunk) {
        const itemRegistry = this.scene?.manager?.itemManager?.registry;
        if (itemRegistry == undefined || chunk == undefined || !Array.isArray(chunk.getItems?.())) {
            return;
        }

        chunk.getItems().forEach((entity) => {
            const wx = chunk.tileOriginX + entity.localX;
            const wy = chunk.tileOriginY + entity.localY;
            itemRegistry.removeItem(wx, wy, { syncChunk: false });
        });
    }

    upsertChunkItemEntity (item, worldX, worldY) {
        if (this.chunkManager == undefined || item == undefined) {
            return;
        }

        const chunk = this.chunkManager.getChunkAtTile(worldX, worldY);
        if (chunk == undefined) {
            return;
        }

        const local = chunk.worldToLocal(worldX, worldY);
        if (local == null) {
            return;
        }

        const existing = chunk.getItems().filter(entity => entity.localX === local.x && entity.localY === local.y);
        existing.forEach(entity => chunk.removeItem(entity.slug, local.x, local.y));

        chunk.addItem(item.info.slug, local.x, local.y, {
            stack: item.stackCount,
            params: item.getParameters(),
            items: this.serializeChunkItemContents(item.getAllItems()),
        });

        if (this.worldSystem) {
            try { this.worldSystem.markDirty(chunk); } catch (e) {}
        }
    }

    removeChunkItemEntity (_item, worldX, worldY) {
        if (this.chunkManager == undefined) {
            return;
        }

        const chunk = this.chunkManager.getChunkAtTile(worldX, worldY);
        if (chunk == undefined) {
            return;
        }

        const local = chunk.worldToLocal(worldX, worldY);
        if (local == null) {
            return;
        }

        const existing = chunk.getItems().filter(entity => entity.localX === local.x && entity.localY === local.y);
        existing.forEach(entity => chunk.removeItem(entity.slug, local.x, local.y));

        if (this.worldSystem) {
            try { this.worldSystem.markDirty(chunk); } catch (e) {}
        }
    }

    upsertChunkObjectEntity (object, worldX, worldY) {
        if (!this.objectChunkSyncEnabled || this.chunkManager == undefined || object == undefined) {
            return;
        }

        const chunk = this.chunkManager.getChunkAtTile(worldX, worldY);
        if (chunk == undefined) {
            return;
        }

        const local = chunk.worldToLocal(worldX, worldY);
        if (local == null) {
            return;
        }

        const payload = this.buildChunkObjectPayload(object, worldX, worldY);
        if (payload == null) {
            return;
        }

        const { slug, params, variety, items, depth, flipX, flipY } = payload;

        const existingObjects = (typeof chunk.getEntitiesByKind === 'function') ? chunk.getEntitiesByKind('object') : [];
        existingObjects
            .filter(entity => entity.localX === local.x && entity.localY === local.y && entity.slug === slug)
            .forEach(entity => chunk.removeEntity('object', entity.slug, local.x, local.y));

        const existingPortals = (typeof chunk.getEntitiesByKind === 'function') ? chunk.getEntitiesByKind('portal') : [];
        existingPortals
            .filter(entity => entity.localX === local.x && entity.localY === local.y && entity.slug === (params.portal?.slug ?? slug))
            .forEach(entity => chunk.removeEntity('portal', entity.slug, local.x, local.y));

        chunk.addEntity('object', slug, local.x, local.y, {
            variety,
            params,
            items,
            depth,
            flipX,
            flipY,
        });

        if (params.portal && params.portal.portalId) {
            chunk.addEntity('portal', params.portal.slug ?? slug, local.x, local.y, {
                portalId: params.portal.portalId,
                room_id: params.portal.room_id,
                x: params.portal.x,
                y: params.portal.y,
                facing: params.portal.facing,
                world: params.portal.world,
                return: params.portal.return,
                address: params.portal.address,
                objectSlug: slug,
            });
        }

        if (this.worldSystem) {
            try { this.worldSystem.markDirty(chunk); } catch (e) {}
        }
    }

    buildChunkObjectPayload (object, worldX, worldY) {
        const slug = object?.info?.slug;
        if (slug == undefined || slug === '') {
            return null;
        }

        const params = {};
        if (object.state && object.state.name) {
            params.state = object.state.name;
        }
        if (object.services) {
            params.services = object.services;
        }
        if (Array.isArray(object.announcements) && object.announcements.length > 0) {
            params.announcements = object.announcements;
        }
        if (object.portal) {
            const roomId = object.portal.room_id;
            const portalId = object.portal.portalId ?? `ext:${roomId}:${worldX}:${worldY}`;
            const returnPortal = object.portal.return ?? {
                ROOM: -1,
                X: worldX,
                Y: worldY,
                FACING: 'S',
                SLUG: slug,
            };

            params.portal = {
                room_id: roomId,
                x: object.portal.x,
                y: object.portal.y,
                facing: object.portal.facing ?? 'N',
                world: { x: worldX, y: worldY },
                return: returnPortal,
                slug: object.portal.slug ?? slug,
                portalId,
                address: object.portal.address ?? null,
            };
        }

        return {
            slug,
            params,
            variety: (typeof object.variety === 'number') ? object.variety : undefined,
            items: this.serializeChunkItemContents(object.items ?? []),
            depth: (object.sprite && typeof object.sprite.depth !== 'undefined') ? object.sprite.depth : undefined,
            flipX: (object.sprite && object.sprite.flipX) ? true : false,
            flipY: (object.sprite && object.sprite.flipY) ? true : false,
        };
    }

    getChunkObjectEntityFingerprint (entity = {}) {
        const payload = {
            slug: entity.slug ?? null,
            localX: entity.localX ?? null,
            localY: entity.localY ?? null,
            variety: entity.variety ?? null,
            params: entity.params ?? null,
            items: entity.items ?? [],
            depth: entity.depth ?? null,
            flipX: entity.flipX === true,
            flipY: entity.flipY === true,
        };

        return JSON.stringify(payload);
    }

    getChunkObjectPayloadFingerprint (payload = {}, localX = null, localY = null) {
        const entityLike = {
            slug: payload.slug ?? null,
            localX,
            localY,
            variety: payload.variety ?? null,
            params: payload.params ?? null,
            items: payload.items ?? [],
            depth: payload.depth ?? null,
            flipX: payload.flipX === true,
            flipY: payload.flipY === true,
        };
        return this.getChunkObjectEntityFingerprint(entityLike);
    }

    snapshotChunkObjectsFromRuntime (chunk) {
        if (chunk == undefined || typeof chunk.getEntitiesByKind !== 'function') {
            return 0;
        }

        const objectRegistry = this.scene?.manager?.objectManager?.registry?.registry;
        if (objectRegistry == undefined || typeof objectRegistry !== 'object') {
            return 0;
        }

        const chunkLeft = chunk.tileOriginX;
        const chunkTop = chunk.tileOriginY;
        const chunkRight = chunkLeft + CHUNK_SIZE;
        const chunkBottom = chunkTop + CHUNK_SIZE;

        const existingObjects = chunk.getEntitiesByKind('object');
        const existingPortals = chunk.getEntitiesByKind('portal');
        if (Array.isArray(existingObjects)) {
            existingObjects.forEach((entity) => chunk.removeEntity('object', entity.slug, entity.localX, entity.localY));
        }
        if (Array.isArray(existingPortals)) {
            existingPortals.forEach((entity) => chunk.removeEntity('portal', entity.slug, entity.localX, entity.localY));
        }

        let addedObjects = 0;
        const seenObjectKinds = new Set();
        const seenPortalIds = new Set();
        Object.entries(objectRegistry).forEach(([key, objects]) => {
            if (!Array.isArray(objects) || objects.length === 0) {
                return;
            }

            const parts = key.split('_');
            const keyX = Number(parts[0]);
            const keyY = Number(parts[1]);

            objects.forEach((object) => {
                const worldX = Number.isFinite(object?.tile_x) ? object.tile_x : keyX;
                const worldY = Number.isFinite(object?.tile_y) ? object.tile_y : keyY;
                if (!Number.isFinite(worldX) || !Number.isFinite(worldY)) {
                    return;
                }

                if (worldX < chunkLeft || worldY < chunkTop || worldX >= chunkRight || worldY >= chunkBottom) {
                    return;
                }

                const local = chunk.worldToLocal(worldX, worldY);
                if (local == null) {
                    return;
                }

                const payload = this.buildChunkObjectPayload(object, worldX, worldY);
                if (payload == null) {
                    return;
                }

                const { slug, params, variety, items, depth, flipX, flipY } = payload;
                const objectKindKey = `${local.x}_${local.y}_${slug}`;
                if (seenObjectKinds.has(objectKindKey)) {
                    return;
                }
                seenObjectKinds.add(objectKindKey);

                chunk.addEntity('object', slug, local.x, local.y, {
                    variety,
                    params,
                    items,
                    depth,
                    flipX,
                    flipY,
                });
                addedObjects += 1;

                if (params.portal && params.portal.portalId) {
                    if (seenPortalIds.has(params.portal.portalId)) {
                        return;
                    }
                    seenPortalIds.add(params.portal.portalId);
                    chunk.addEntity('portal', params.portal.slug ?? slug, local.x, local.y, {
                        portalId: params.portal.portalId,
                        room_id: params.portal.room_id,
                        x: params.portal.x,
                        y: params.portal.y,
                        facing: params.portal.facing,
                        world: params.portal.world,
                        return: params.portal.return,
                        address: params.portal.address,
                        objectSlug: slug,
                    });
                }
            });
        });

        if (this.worldSystem) {
            try { this.worldSystem.markDirty(chunk); } catch (e) {}
        }
        else {
            chunk.dirty = true;
        }

        return addedObjects;
    }

    snapshotAllChunkObjectsFromRuntime () {
        if (this.chunkManager == undefined) {
            return 0;
        }

        const chunks = this.chunkManager.getAllChunks();
        if (!Array.isArray(chunks) || chunks.length === 0) {
            return 0;
        }

        let total = 0;
        chunks.forEach((chunk) => {
            total += this.snapshotChunkObjectsFromRuntime(chunk);
        });

        if (this.debug) {
            console.log(`[ChunkSnapshot] rebuilt object entities from runtime across ${chunks.length} chunks, totalObjects=${total}`);
        }

        return total;
    }

    async flushChunkOnLeave (chunk, reason = 'leave') {
        if (!chunk || !chunk.loaded || this.worldDataLoader == undefined) {
            return false;
        }

        const existing = this.pendingChunkFlushes.get(chunk.key);
        if (existing != undefined) {
            return existing;
        }

        const flushPromise = (async () => {
            const added = this.snapshotChunkObjectsFromRuntime(chunk);
            if (this.debug) {
                console.log(`[ChunkFlush] ${reason} ${chunk.key} objects=${added}`);
            }

            if (typeof this.worldDataLoader.saveChunk !== 'function') {
                return false;
            }

            const ok = await this.worldDataLoader.saveChunk(chunk);
            if (ok && this.worldSystem && typeof this.worldSystem.clearDirtyFor === 'function') {
                try { this.worldSystem.clearDirtyFor(chunk); } catch (e) {}
            }

            if (this.debug) {
                console.log(`[ChunkFlush] ${reason} ${chunk.key} saved=${ok}`);
            }

            return ok;
        })();

        this.pendingChunkFlushes.set(chunk.key, flushPromise);
        return flushPromise.finally(() => {
            this.pendingChunkFlushes.delete(chunk.key);
        });
    }

    async flushActiveChunksOnTransition (reason = 'transition') {
        if (this.chunkManager == undefined) {
            return { attempted: 0, saved: 0 };
        }

        const activeChunks = this.chunkManager.getActiveChunks();
        if (!Array.isArray(activeChunks) || activeChunks.length === 0) {
            return { attempted: 0, saved: 0 };
        }

        const results = await Promise.all(activeChunks.map((chunk) => this.flushChunkOnLeave(chunk, reason)));
        const saved = results.filter(Boolean).length;
        return { attempted: activeChunks.length, saved };
    }

    removeChunkObjectEntity (_object, worldX, worldY) {
        if (!this.objectChunkSyncEnabled || this.chunkManager == undefined) {
            return;
        }

        const chunk = this.chunkManager.getChunkAtTile(worldX, worldY);
        if (chunk == undefined) {
            return;
        }

        const local = chunk.worldToLocal(worldX, worldY);
        if (local == null) {
            return;
        }

        if (typeof chunk.getEntitiesByKind !== 'function') {
            return;
        }

        const slug = _object?.info?.slug ?? null;
        const existingObjects = chunk.getEntitiesByKind('object').filter(entity => {
            if (entity.localX !== local.x || entity.localY !== local.y) return false;
            if (slug == null) return true;
            return entity.slug === slug;
        });
        existingObjects.forEach(entity => chunk.removeEntity('object', entity.slug, local.x, local.y));

        const existingPortals = chunk.getEntitiesByKind('portal').filter(entity => {
            if (entity.localX !== local.x || entity.localY !== local.y) return false;
            if (slug == null) return true;
            return entity.objectSlug === slug || entity.slug === slug;
        });
        existingPortals.forEach(entity => chunk.removeEntity('portal', entity.slug, local.x, local.y));

        if (this.worldSystem) {
            try { this.worldSystem.markDirty(chunk); } catch (e) {}
        }
    }

    serializeChunkItemContents (items = []) {
        if (!Array.isArray(items)) {
            return [];
        }

        return items.map((item) => {
            const slug = item?.slug ?? item?.info?.slug;
            if (slug == undefined || slug === '') {
                return null;
            }

            return {
                slug,
                stack: item?.stack ?? item?.stackCount,
                items: this.serializeChunkItemContents(item?.items ?? item?.ITEMS ?? []),
            };
        }).filter(Boolean);
    }

    deserializeChunkEntityItems (items = []) {
        const itemManager = this.scene?.manager?.itemManager;
        if (!Array.isArray(items) || itemManager == undefined) {
            return [];
        }

        const result = [];
        items.forEach((entry) => {
            const slug = entry?.slug ?? entry?.info?.slug;
            if (slug == undefined || slug === '') {
                return;
            }

            const nested = this.deserializeChunkEntityItems(entry.items ?? []);
            const built = itemManager.newItem(slug, nested);
            if (!built) {
                return;
            }

            if (entry.stack != undefined && built.setStackCount != undefined) {
                built.setStackCount(entry.stack);
            }

            result.push(built);
        });

        return result;
    }

    refreshChunkCollisions () {
        this.wallLayer.setCollisionByExclusion([-1]);
    }

    setKeyLight (key_light_name) {
        var phase = this.keylight[key_light_name];
        this.groundLayer.setTint(phase.ground_tint);
        this.edgeLayer.setTint(phase.ground_tint);
        this.wallLayer.setTint(phase.wall_tint);
        this.roofLayer.setTint(phase.roof_tint);
        this.lastKeyLight = key_light_name;
        this.scene.app.camera.setKeyLightBackground(phase.reflection_color, phase.glass_opacity);
    }

    createItems () {
        let blocks = this.blocks;
        MAP_CONFIG.blocks.forEach(function (block, index) {
            blocks[block.y][block.x].buildItems(); 
        });
        
    }

    buildTiles() {
        if (this.useLegacySlotBlockSave !== true) {
            return false;
        }
        let loaded = false;
        if (this.scene.slot?.BLOCKS?.[this.block.x] != undefined) {
            if (this.scene.slot.BLOCKS[this.block.x][this.block.y] != undefined) {
                this.scene.exterior.loadBlockWalls(this.scene.slot.BLOCKS[this.block.x][this.block.y]);
                loaded = true;
            }
        }
        return loaded;
    }

    setMouseInput () {
        var self = this;
        this.scene.input.on('pointerup', function (pointer) {
            if (self.scene.manager.getFocus().name != 'PLAYER') {
                return;
            }
            const tileX = Math.round(pointer.worldX / 16);
            const tileY = Math.round(pointer.worldY / 16);

            if (!self.inWorldBounds(tileX, tileY)) {
                return;
            }

            if (!self.isWalkable(tileX, tileY)) {
                return;
            }

            // A world tile was clicked.
            self.scene.player.clearDestinations();
            console.log("Clicked tile at:", tileX, tileY);
            if (self.scene.player.state.name == 'IDLE' || self.scene.player.state.name == 'WALKING') {
                self.scene.player.moveToTile(tileX, tileY);
            }
        });
    }

    update () {
        const player = this.scene?.player;
        if (player == undefined) {
            return;
        }

        const actionTile = player.action?.actionTile;
        const standingTile = player.standingTile;
        if (actionTile == undefined && standingTile == undefined) {
            return;
        }

        const x = actionTile?.x ?? standingTile?.x;
        const y = actionTile?.y ?? standingTile?.y;
        if (x == undefined || y == undefined) {
            return;
        }

        // Keep ChunkManager aware of the player's world tile position.
        if (this.chunkManager != undefined && standingTile != undefined) {
            this.chunkManager.update(
                standingTile.x,
                standingTile.y
            );
        }

        if (this.useChunkStreamingBootstrap) {
            return;
        }

        var thisBlock = this.xyToBlock(x,y);
        if (this.lastBlock.x != thisBlock.x || this.lastBlock.y != thisBlock.y) {
            console.log('Leaving block '+this.lastBlock.x+','+this.lastBlock.y);
            // Soft save the last block
            if (this.useLegacySlotBlockSave === true) {
                this.scene.app.saveManager.softSaveBlock(this.lastBlock.x, this.lastBlock.y);
            }
            this.lastBlock = thisBlock;
            this.block = this.getBlock(thisBlock.x, thisBlock.y);
            console.log('Entered block '+thisBlock.x+','+thisBlock.y);
            //this.updateDirections(1,1,3,3);
        }
/*
        if (this.lastTile.x != x || this.lastTile.y != y) {
            this.lastTile = {x: x, y: y};
            if (this.block) {
                var quad = this.blockQuadrant(x,y);
                var map_message = this.getPositionString(quad.v, quad.h, this.block.block);
                var prop = this.block.onProperty(x,y);
                if (prop) {
                    map_message = 'at '+prop.address.number+' '+prop.address.dir+' '+prop.address.street;
                }
                if (map_message != '') {
                    map_message = 'I am ' + map_message;
                }
                //this.scene.manager.hud.hudDisplay.tellMapBoxFlag(map_message);
            }
        }
*/
        
    }

    updateDirections (route_a_x, route_a_y, route_b_x, route_b_y) {
        
            var plot = this.nav.plotRoutes(route_a_x,route_a_y,route_b_x,route_b_y,'intersection');
            var directions = plot.join(" ");
            this.scene.manager.hud.hudDisplay.drawDirections(directions);

    }

    buildCity () {
        const blocks = this.blocks;
        MAP_CONFIG.blocks.forEach(function (block, index) {
            blocks[block.y][block.x].buildProperties(); 
        });

    }

    setCorners (block) {
        var self = this;
        var recipe = self.cook('SIDEWALK_2X2');
        var recipe_x = 0;
        var recipe_y = 0;
        var sidewalk_depth = 3;

        if (block.offset.n > 0) {
            // Top / North Side of block
            // Bottom / South side of street!
            recipe_x = block.left;
            recipe_y = block.top;
            
            //self.cookRecipe(recipe_x, recipe_y, recipe);
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,block.width-2, sidewalk_depth);
        }

        if (block.offset.e > 0) {
            // Right / East Side of block
            // Left / West side of street!
            recipe_x = block.right-sidewalk_depth;
            recipe_y = block.top;
            
            //self.cookRecipe(recipe_x, recipe_y, recipe);
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,sidewalk_depth, block.height-2);
        }

        if (block.offset.s > 0) {
            // Bottom / South Side of block
            // Top / North side of street!
            recipe_x = block.left+1;
            recipe_y = block.bottom-sidewalk_depth;
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,block.width-2, sidewalk_depth);
        }

        if (block.offset.w > 0) {
            // Left / West Side of block
            // Right / East side of street!
            recipe_x = block.left;
            recipe_y = block.top;
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,sidewalk_depth, block.height);
        }

        if (block.offset.n > 0 && block.offset.w > 0) { // Upper left
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_, block.left - 1, block.top - 1,1, 1);
            this.groundLayer.weightedRandomize(TILES.CURB.EAST_, block.left - 1, block.top,1, 1);
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTH_, block.left, block.top - 1,1, 1);
            recipe_x = block.left;
            recipe_y = block.top;
            self.cookRecipe(recipe_x, recipe_y, recipe);
            
        }
        if (block.offset.n > 0 && block.offset.e > 0) {  // Upper right
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_, block.right, block.top - 1,1, 1);

            recipe_x = block.right-recipe.WIDTH;
            recipe_y = block.top;
            self.cookRecipe(recipe_x, recipe_y, recipe);

        }
        if (block.offset.s > 0 && block.offset.w > 0) { // Lower left
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_, block.left - 1, block.bottom,1, 1);

            recipe_x = block.left+1;
            recipe_y = block.bottom-recipe.HEIGHT;
            self.cookRecipe(recipe_x, recipe_y, recipe);
        }
        if (block.offset.s > 0 && block.offset.e > 0) { // LOWER RIGHT
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHWEST_, block.right, block.bottom,1, 1);

            recipe_x = block.right-recipe.WIDTH;
            recipe_y = block.bottom-recipe.HEIGHT;
            self.cookRecipe(recipe_x, recipe_y, recipe);
        }

    }

    getBlockNodeProperties (_x,_y) {
        /// first make sure this.nodes.[_y][_x] exists
        if (this.nodes[_y] == undefined || this.nodes[_y][_x] == undefined) {
            return null;
        }
        return this.nodes[_y][_x].node == undefined ? null : this.nodes[_y][_x].node;
    }

    getBlockNode (_x,_y) {
        if (this.nodes[_y] == undefined || this.nodes[_y][_x] == undefined) {
            return null;
        }
        return this.nodes[_y][_x];
    }


    getBlockProperties (_x,_y) {
        return this.blocks[_y][_x].block;
    }

    getBlock (_x,_y) {
        return this.blocks[_y][_x];
    }

    xyToBlock (_x,_y) {
        return {
            x: Math.floor(_x/MAP_CONFIG.blockWidth),
            y: Math.floor(_y/MAP_CONFIG.blockHeight)
        };
    }

    blockQuadrant (_x,_y) {
        const block = this.block;
        var quadrant = {v: '', h: ''};
        if (_x - block.left > block.width / 2) { ///  East
            quadrant.h = 'e';
        }
        else { /// West
            quadrant.h = 'w';
        }

        if (_y - block.top < block.height / 2) { ///  North
            quadrant.v = 'n';
        }
        else { /// South
            quadrant.v = 's';
        }
        return quadrant;

    }

    getAddressFromSlug (slug) {
        var found = false;
        MAP_CONFIG.propertyLines.forEach(function (prop, index) {
            if (prop.listing.slug == slug) {
                found = prop.address;
            }
        });
        if (!found) {
            console.log('Requested property not found: '+slug);
        }
        return found;
    }

    getTilesFromSlug (slug) {
        let prop = this.getAddressFromSlug(slug);
        if (!prop) {
            return;
        }
        else {
            return this.getFrontDoorTilesFromAddress(prop.dir, prop.number, prop.street);
        }
    }

    getFrontDoorTilesFromAddress(dir, number, street) {
        let door = this.getFrontDoorFromAddress(dir, number, street);
        if (!door) return null;
        return {x: door.x, y: door.y};
    }

    getFrontDoorFromAddress(dir, number, street) {
         let prop = this.getPropertyFromAddress(dir, number, street);
         if (!prop) {
              return null;
         }

         // If a portal.world coordinate was recorded during property build,
         // prefer that (this is the authoritative front-door mapping).
         try {
             if (prop.portal && prop.portal.world && prop.portal.world.x != null && prop.portal.world.y != null) {
                 return { x: prop.portal.world.x, y: prop.portal.world.y };
             }
         } catch (e) {}

         // Fallback: derive a sensible front-door position from the property's
         // `lines` rectangle (bottom-center of the parcel).
         try {
             if (prop.lines && typeof prop.lines.x === 'number' && typeof prop.lines.y === 'number') {
                 const fx = prop.lines.x + Math.floor((prop.lines.width ?? 1) / 2);
                 const fy = prop.lines.y + (prop.lines.height ? (prop.lines.height - 1) : 0);
                 if (this.debug) console.warn(`[Exterior] using fallback front-door for ${dir} ${number} ${street} -> ${fx},${fy}`);
                 return { x: fx, y: fy };
             }
         } catch (e) {}

         return null;
     }

    getExteriorReturnFromPortal(portal = {}) {
        const portalId = portal?.portalId ?? null;
        const roomId = portal?.room_id ?? null;
        const address = portal?.address ?? null;
        const portals = Array.isArray(this.portalIndex) ? this.portalIndex : [];

        const normalizeAddressKey = (value) => {
            if (!value) {
                return null;
            }

            const dir = String(value.dir ?? '').trim().toUpperCase();
            const number = String(value.number ?? '').trim();
            const street = String(value.street ?? '').trim().toUpperCase();
            if (dir === '' || number === '' || street === '') {
                return null;
            }

            return `${dir}|${number}|${street}`;
        };

        let match = null;
        if (portalId != null) {
            match = portals.find(entry => entry?.portalId === portalId) ?? null;
        }
        if (!match) {
            const addressKey = normalizeAddressKey(address);
            if (addressKey != null) {
                match = portals.find(entry => normalizeAddressKey(entry?.address) === addressKey) ?? null;
            }
        }
        if (!match && roomId != null) {
            match = portals.find(entry => String(entry?.room_id) === String(roomId)) ?? null;
        }

        if (!match || match.x == null || match.y == null) {
            return null;
        }

        return {
            portalId: match.portalId ?? portalId,
            room_id: match.room_id,
            x: match?.return?.X ?? match.x,
            y: match?.return?.Y ?? match.y,
            facing: match.return?.FACING ?? match.facing ?? 'S',
            slug: match.return?.SLUG ?? match.slug ?? null,
            return: match.return ?? null,
        };
    }

    buildPortalIndexData () {
        return {
            version: 1,
            generatedAt: Date.now(),
            slot: this.getActiveSaveSlot(),
            portals: Array.isArray(this.portalIndex) ? this.portalIndex.slice() : [],
        };
    }

    hasPortalIndexEntries () {
        return Array.isArray(this.portalIndex) && this.portalIndex.length > 0;
    }

    async savePortalIndexFile () {
        try {
            if (!this.worldDataLoader || !this.worldDataLoader._canUseElectronApi || typeof this.worldDataLoader.savePortalIndex !== 'function') {
                return false;
            }

            // Rebuild from the current live object registry so every portal
            // generated by blueprints is captured before writing the file.
            this.rebuildPortalIndexFromObjects();

            if (!this.hasPortalIndexEntries()) {
                return false;
            }

            const payload = this.buildPortalIndexData();
            return await this.worldDataLoader.savePortalIndex(payload);
        } catch (e) {
            if (this.debug) {
                console.warn('[Exterior] savePortalIndexFile failed', e);
            }
            return false;
        }
    }

    getMailboxTilesFromAddress(dir, number, street) {
        let mailbox = this.getMailboxFromAddress(dir, number, street);
        return {x: mailbox.x, y: mailbox.y};
    }

    getMailboxFromAddress(dir, number, street) {
       let prop = this.getPropertyFromAddress(dir, number, street);
       if (!prop) {
           return;
       }
       else {
        return {x: prop.lines.left,y: prop.lines.bottom};
       }
    }

    getPropertyFromAddress(dir, number, street) {
        var found = false;
        MAP_CONFIG.propertyLines.forEach(function (prop, index) {
            if (prop.address.number == number && prop.address.street == street && prop.address.dir == dir) {
                found = prop;
            }
        });
        if (!found) {
            console.log('Requested property not found: '+dir+' '+number+' '+street);
        }
        return found;
    }

    cook (recipe_name) {
        var recipe = COOK[recipe_name];
        if (recipe == undefined) {
            console.log('Missing recipe: '+recipe_name);
            return false;
        }
        return recipe;
    }

    cookRecipe(_x, _y, recipe) {
        if (recipe == undefined) {
            return;
        }
        var width = recipe.WIDTH;
        var height = recipe.HEIGHT;
        var tile = recipe.TILES;
        var recipe_index = 0;
        for (var h=0;h<height;h++) {
            for (var w=0;w<width;w++) {

                this.groundLayer.weightedRandomize(tile[recipe_index],parseInt( _x + w),parseInt(_y + h), 1, 1);
                recipe_index++;

                //this.groundLayer.putTileAt(0, parseInt( _x + w),parseInt(_y + h))
            }
        }
    }

    getPositionString (_v,_h, _block) {
        var position_string = '';
        if (_v != '' && _block.bounds[_v] != '') {
            if (_v == 'n') {
                position_string = 'south of '+_block.bounds[_v];
            }
            else {
                position_string = 'north of '+_block.bounds[_v];
            }

            if (_h != '' && _block.bounds[_h] != '') {
                position_string += ' & ';
            }
        }
        if (_h != '' && _block.bounds[_h] != '') {
            if (_h == 'e') {
                position_string += 'west of '+_block.bounds[_h];
            }
            else {
                position_string += 'east of '+_block.bounds[_h];
            }
        }
        return position_string;
    }

    validBlock (_x,_y) {
        if (_x < 0 || _y < 0 || _x >= MAP_CONFIG.sectionsWidth || _y >= MAP_CONFIG.sectionsHeight) {
            return false;
        }
        return true;
    }

    inWorldBounds (_x, _y) {
        return (_x >= 0 && _y >= 0 && _x < MAP_CONFIG.width && _y < MAP_CONFIG.height);
    }

    isWalkable (_x, _y) {
        if (!this.inWorldBounds(_x, _y)) {
            return false;
        }

        if (this.chunkManager == undefined) {
            return false;
        }

        const chunk = this.chunkManager.getChunkAtTile(_x, _y);
        if (chunk == undefined || !chunk.loaded) {
            this.trackWorldQueryMiss('walkable_unloaded', _x, _y);
            return false;
        }

        return chunk.isWalkable(_x, _y);
    }

    getGroundAt (_x, _y) {
        if (!this.inWorldBounds(_x, _y)) {
            return GROUND_TYPE.VOID;
        }

        if (this.chunkManager == undefined) {
            return GROUND_TYPE.VOID;
        }

        const chunk = this.chunkManager.getChunkAtTile(_x, _y);
        if (chunk == undefined || !chunk.loaded) {
            this.trackWorldQueryMiss('ground_unloaded', _x, _y);
            return GROUND_TYPE.VOID;
        }

        const groundType = chunk.getGroundType(_x, _y);
        if (groundType != null && GROUND_TYPE[groundType] != undefined) {
            return GROUND_TYPE[groundType];
        }

        return GROUND_TYPE.VOID;
    }

    trackWorldQueryMiss (kind, _x, _y) {
        if (this.worldQueryMisses[kind] == undefined) {
            this.worldQueryMisses[kind] = 0;
        }

        this.worldQueryMisses[kind] += 1;

        if (MAP_CONFIG.debugWorldQueryMisses === true && this.worldQueryMisses[kind] % 50 === 1) {
            console.warn(`[WorldQueryMiss] ${kind} at ${_x},${_y} (count=${this.worldQueryMisses[kind]})`);
        }
    }

    async saveDirtyChunks () {
        let portalIndexSaved = false;

        // Prefer using WorldSystem if available for centralized dirty tracking
        if (this.worldSystem != null && typeof this.worldSystem.saveDirtyChunks === 'function') {
            const res = await this.worldSystem.saveDirtyChunks();
            portalIndexSaved = await this.savePortalIndexFile();
            if (this.debug) {
                console.log(`[ChunkManager] saveDirtyChunks dirty=${res.dirty} saved=${res.saved} failed=${res.failed} portalIndexSaved=${portalIndexSaved}`);
            }
            return { totalDirty: res.dirty, saved: res.saved, failed: res.failed, portalIndexSaved };
        }

        // Fallback for older behavior
        if (this.chunkManager == undefined || this.worldDataLoader == undefined) {
            return { totalDirty: 0, saved: 0, failed: 0, portalIndexSaved };
        }

        const dirtyChunks = this.chunkManager.getAllChunks().filter(chunk => chunk.dirty);
        if (dirtyChunks.length === 0) {
            portalIndexSaved = await this.savePortalIndexFile();
            return { totalDirty: 0, saved: 0, failed: 0, portalIndexSaved };
        }

        let saved = 0;
        let failed = 0;

        for (const chunk of dirtyChunks) {
            const ok = await this.worldDataLoader.saveChunk(chunk);
            if (ok) {
                saved += 1;
            }
            else {
                failed += 1;
            }
        }

        portalIndexSaved = await this.savePortalIndexFile();

        if (this.debug) {
            console.log(`[ChunkManager] saveDirtyChunks dirty=${dirtyChunks.length} saved=${saved} failed=${failed} portalIndexSaved=${portalIndexSaved}`);
        }

        return {
            totalDirty: dirtyChunks.length,
            saved,
            failed,
            portalIndexSaved,
        };
    }

    getActiveSaveSlot () {
        const slot = this.scene?.slot?.SAVE?.SLOT;
        const parsed = Number.isInteger(slot) ? slot : parseInt(slot, 10);
        return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
    }

}