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
import { CHUNK_SIZE } from "../world/chunk.js";
import WorldDataLoader from "../world/world-data-loader.js";
import "../world/world-system.js";
import ChunkDebugUI from "../dev/chunk-debug-ui.js";
import GROUND_TYPE from "../config/atlas/ground-types.js";
import TYPE_BY_TILE_INDEX from "../config/atlas/type-by-tile-index.js";

/**
 * 	Manage Exteriors (Overworld tile scenes)
 *	
 */
 export default class ExteriorManager {

    constructor(scene) {
        this.scene = scene;
        this.debug = true;
    }

    initialize () {
        this.lastKeyLight = null;
        this.keylight = KEYLIGHT;

        this.nav = new Navigator(this.scene);

        // World chunk system — runs in parallel with Phaser rendering.
        const worldChunksWidth  = Math.ceil(MAP_CONFIG.width  / CHUNK_SIZE);
        const worldChunksHeight = Math.ceil(MAP_CONFIG.height / CHUNK_SIZE);
        this.chunkManager = new ChunkManager({
            activeRadius:      2,
            maxLoadedChunks:   128,
            worldChunksWidth,
            worldChunksHeight,
        });
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

        if (!this.useChunkStreamingBootstrap) {
            this.buildMap();
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
            this.beginChunkStreaming();
            return;
        }

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

        // Switch rendering over to chunk streaming.
        this.beginChunkStreaming();
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
        });

        if (this.debug) {
            console.log(`[ChunkManager] snapshot complete — ${this.chunkManager.getAllChunks().length} chunks populated`);
        }
    }

    beginChunkStreaming () {
        this.clearRenderedLayers();
        this.refreshChunkCollisions();

        const standingTile = this.scene.player?.standingTile;
        const startX = standingTile?.x ?? this.scene.player?.action?.actionTile?.x ?? 0;
        const startY = standingTile?.y ?? this.scene.player?.action?.actionTile?.y ?? 0;

        this.chunkManager.update(startX, startY);
    }

    handleChunkLoad (chunk) {
        if (!this.useChunkStreamingBootstrap) {
            this.renderChunk(chunk);
            return;
        }

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
            }
            return;
        }

        if (this.chunkManager.isChunkActive(chunk.chunkX, chunk.chunkY)) {
            this.renderChunk(chunk);
        }
    }

    async handleChunkPrefetch (chunk) {
        if (!chunk || chunk.loaded) return;
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

        for (let ly = 0; ly < CHUNK_SIZE; ly++) {
            for (let lx = 0; lx < CHUNK_SIZE; lx++) {
                const wx = originX + lx;
                const wy = originY + ly;
                if (wx < 0 || wy < 0 || wx >= MAP_CONFIG.width || wy >= MAP_CONFIG.height) {
                    continue;
                }

                this.groundLayer.putTileAt(chunk.getLayerTile('ground', wx, wy), wx, wy);
                this.edgeLayer.putTileAt(chunk.getLayerTile('edge', wx, wy), wx, wy);
                this.wallLayer.putTileAt(chunk.getLayerTile('wall', wx, wy), wx, wy);
                this.roofLayer.putTileAt(chunk.getLayerTile('roof', wx, wy), wx, wy);
            }
        }

        this.renderChunkItemEntities(chunk);

        chunk.rendered = true;
        this.refreshChunkCollisions();
    }

    unrenderChunk (chunk) {
        if (!chunk || !chunk.rendered) {
            return;
        }

        const originX = chunk.tileOriginX;
        const originY = chunk.tileOriginY;

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

        // Destroy per-chunk layer (basic orchestration hook)
        try { this.destroyChunkLayer(chunk); } catch (e) {}

        chunk.rendered = false;
        this.refreshChunkCollisions();
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
        let loaded = false;
        if (this.scene.slot.BLOCKS[this.block.x] != undefined) {
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
        const x = this.scene.player.action.actionTile.x;
        const y = this.scene.player.action.actionTile.y;

        // Keep ChunkManager aware of the player's world tile position.
        if (this.scene.player.standingTile != undefined) {
            this.chunkManager.update(
                this.scene.player.standingTile.x,
                this.scene.player.standingTile.y
            );
        }

        if (this.useChunkStreamingBootstrap) {
            return;
        }

        var thisBlock = this.xyToBlock(x,y);
        if (this.lastBlock.x != thisBlock.x || this.lastBlock.y != thisBlock.y) {
            console.log('Leaving block '+this.lastBlock.x+','+this.lastBlock.y);
            // Soft save the last block
            this.scene.app.saveManager.softSaveBlock(this.lastBlock.x, this.lastBlock.y);
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
        return {x: door.x, y: door.y};
    }

    getFrontDoorFromAddress(dir, number, street) {
         let prop = this.getPropertyFromAddress(dir, number, street);
         if (!prop) {
              return;
         }
         else {
            console.log(prop.portal);
          return {x: prop.portal.world.x,y: prop.portal.world.y};
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
        // Prefer using WorldSystem if available for centralized dirty tracking
        if (this.worldSystem != null && typeof this.worldSystem.saveDirtyChunks === 'function') {
            const res = await this.worldSystem.saveDirtyChunks();
            if (this.debug) {
                console.log(`[ChunkManager] saveDirtyChunks dirty=${res.dirty} saved=${res.saved} failed=${res.failed}`);
            }
            return { totalDirty: res.dirty, saved: res.saved, failed: res.failed };
        }

        // Fallback for older behavior
        if (this.chunkManager == undefined || this.worldDataLoader == undefined) {
            return { totalDirty: 0, saved: 0, failed: 0 };
        }

        const dirtyChunks = this.chunkManager.getAllChunks().filter(chunk => chunk.dirty);
        if (dirtyChunks.length === 0) {
            return { totalDirty: 0, saved: 0, failed: 0 };
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

        if (this.debug) {
            console.log(`[ChunkManager] saveDirtyChunks dirty=${dirtyChunks.length} saved=${saved} failed=${failed}`);
        }

        return {
            totalDirty: dirtyChunks.length,
            saved,
            failed,
        };
    }

    getActiveSaveSlot () {
        const slot = this.scene?.slot?.SAVE?.SLOT;
        const parsed = Number.isInteger(slot) ? slot : parseInt(slot, 10);
        return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
    }

}