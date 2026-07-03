import TILES from "../config/atlas/tile-weights.js";
import PropertyLine from "./exterior-property.js";
import MAP_CONFIG from "../config/map.js";

export default class BlockBlueprint {

    constructor(scene, block) {
        this.scene = scene;
        this.block = block;
        this.propertyLines = [];
        this.wallsBuilt = false;
        this.useLegacySlotBlockSave = this.scene?.exterior?.useLegacySlotBlockSave === true;

        const savedBlock = this.useLegacySlotBlockSave ? this.scene?.slot?.BLOCKS?.[block.x]?.[block.y] : undefined;
        if (savedBlock != undefined) {
            this.loadBlockGround(savedBlock);
            this.loadBlockWalls(savedBlock);
            this.wallsBuilt = true;
        } else {
            this.setGround();
        }
    }

    loadBlockWalls(data) {
        const wallLayer = this.scene[this.scene.locale].wallLayer;
        for (let y = 0; y < data.walls.length; y++) {
            for (let x = 0; x < data.walls[y].length; x++) {
                let tile_index = data.walls[y][x];
                if (tile_index >= 0) {
                    wallLayer.putTileAt(tile_index, this.block.block_tile_x + x, this.block.block_tile_y + y);
                }
            }
        }
    }

    loadBlockGround(data) {
        const groundLayer = this.scene[this.scene.locale].groundLayer;
        for (let y = 0; y < data.ground.length; y++) {
            for (let x = 0; x < data.ground[y].length; x++) {
                let tile_index = data.ground[y][x];
                if (tile_index >= 0) {
                    groundLayer.putTileAt(tile_index, this.block.block_tile_x + x, this.block.block_tile_y + y);
                }
            }
        }
    }

    setGround() {
        const block = this.block;
        let groundLayer = this.scene[this.scene.locale].groundLayer;
        if (block.ground.toUpperCase() == 'FOREST') {
            groundLayer.weightedRandomize(TILES['MULCH'].FILL_, block.left, block.top, block.width, block.height);
        } else {
            groundLayer.weightedRandomize(TILES[block.ground.toUpperCase()].FILL_, block.left, block.top, block.width, block.height);
        }
    }

    setForest() {
        const block = this.block;
        const groundLayer = this.scene[this.scene.locale].groundLayer;

        groundLayer.weightedRandomize(TILES.DIRT.FILL_, block.left, block.top, block.width, block.height);

        for (let h = 0; h < block.height - (block.offset.n + block.offset.s); h++) {
            for (let w = 0; w < block.width - (block.offset.w + block.offset.e); w++) {
                var tile = Phaser.Math.RND.between(0, 128);

                switch (tile) {
                    case 0:
                        var x = block.left + w + block.offset.w;
                        var y = block.top + h + block.offset.n;
                        this.scene.manager.treeManager.newTreeToWorld(x, y + .5, 'ASH');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x - 2, y - 2, 5, 5);
                        groundLayer.weightedRandomize(TILES.LEAVES.FILL_, x - 1, y - 1, 3, 3);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x - 1, y - 1, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x + 1, y - 1, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x - 1, y + 1, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x + 1, y + 1, 1, 1);
                        break;
                }
            }
        }
    }

    addPropertyLine(prop) {
        prop.lines.top = this.block.top + prop.lines.y;
        prop.lines.left = this.block.left + prop.lines.x;
        prop.lines.bottom = this.block.top + prop.lines.y + prop.lines.height;
        prop.lines.right = prop.lines.left + prop.lines.width;

        let propertyLine = new PropertyLine(this.scene, prop, this.wallsBuilt);
        this.propertyLines.push(propertyLine);
    }

    buildProperties() {
        this.propertyLines.forEach(function (prop, index) {
            prop.buildIt();
        });
    }

    getAdjoiningNodes(_x, _y) {
        var nodes = { NW: null, NE: null, SE: null, SW: null };
        nodes.NW = this.scene.exterior.getBlockNodeProperties(_x, _y);
        nodes.NE = this.scene.exterior.getBlockNodeProperties(_x + 1, _y);
        nodes.SE = this.scene.exterior.getBlockNodeProperties(_x + 1, _y + 1);
        nodes.SW = this.scene.exterior.getBlockNodeProperties(_x, _y + 1);
        return nodes;
    }

    buildObjects() {
        if (this.block.offset.n > 0) {
            this.scene.manager.objectManager.newObjectToWorld(this.block.left + 7, this.block.top, 'POSTBOX_S');
            this.scene.manager.objectManager.newObjectToWorld(this.block.left + 12, this.block.top, 'HYDRANT_CITY_');
        }

        if (this.block.offset.s > 0) {
            this.scene.manager.objectManager.newObjectToWorld(this.block.right - 7, this.block.bottom - 1, 'HYDRANT_CITY_');

            this.scene.manager.treeManager.newTreeToWorld(this.block.left + 8.25, this.block.bottom - .25, 'SUGAR_MAPLE');
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.DIRT.FILL_, this.block.left + 8, this.block.bottom - 1, 2, 1);

            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.DIRT.FILL_, this.block.left + 27, this.block.bottom - 1, 2, 1);

            this.scene.manager.treeManager.newTreeToWorld(this.block.left + 36.25, this.block.bottom - .25, 'ASH');
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MULCH.FILL_, this.block.left + 36, this.block.bottom - 1, 2, 1);
        }

        if (this.block.offset.e > 0) {
            this.buildStreetPole(this.block.right - 1, this.block.bottom - 8, { TELEPHONE: true }, false);
            this.buildStreetPole(this.block.right - 1, this.block.top + 7, { TELEPHONE: true }, false);
        }

        if (this.block.ground.toUpperCase() == 'FOREST') {
            this.buildForest();
        }
    }
    

    buildRaspberryPatch(_x, _y, width = 3, height = 3) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking patch
                if (Phaser.Math.RND.between(0, 1) == 0) continue;
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) continue;
                var variation = Phaser.Math.RND.between(1, 3);
                var cane = this.scene.manager.objectManager.newObjectToWorld(x, y, 'RASPBERRY_CANE_'+variation);

                if (cane) {
                    // Randomly flip the raspberry cane to add some visual variety
                    cane.sprite.setFlipX((Phaser.Math.RND.between(0, 1) == 0));
                    this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                    if (variation < 3 && Phaser.Math.RND.between(0, 1) == 0) {
                        cane.setState('FLOWERING');
                    }
                }
            }
        }
    }

    buildMilkweedPatch(_x, _y, width = 3, height = 3) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking patch
                if (Phaser.Math.RND.between(0, 1) == 0) continue;
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) continue;
                var milkweed = this.scene.manager.plantManager.newPlantToWorld(x, y, 'MILKWEED', Phaser.Math.RND.between(2, 16));
                if (milkweed) {
                    // Randomly flip the milkweed to add some visual variety
                    milkweed.sprite.setFlipX((Phaser.Math.RND.between(0, 1) == 0));
                    this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MUD.FILL_, x, y, 1, 1);
                }
            }
        }
    }

    buildFoxtailPatch(_x, _y, width = 3, height = 3) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking patch
                if (Phaser.Math.RND.between(0, 1) == 0) continue;
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) continue;
                var foxtail = this.scene.manager.plantManager.newPlantToWorld(x, y, 'FOXTAIL', Phaser.Math.RND.between(8, 26));
                if (foxtail) {
                    // Randomly flip the foxtail to add some visual variety
                    foxtail.sprite.setFlipX((Phaser.Math.RND.between(0, 1) == 0));
                    this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                }
            }
        }
    }

    buildDandelionPatch(_x, _y, width = 3, height = 3) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking patch
                if (Phaser.Math.RND.between(0, 1) == 0) continue;
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) continue;
                var dandelion = this.scene.manager.plantManager.newPlantToWorld(x, y, 'DANDELION', Phaser.Math.RND.between(1, 44));
                if (dandelion) {
                    // Randomly flip the dandelion to add some visual variety
                    dandelion.sprite.setFlipX((Phaser.Math.RND.between(0, 1) == 0));
                }
            }
        }
    }

    buildCreekSedgePatch(_x, _y, width = 3, height = 3) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking patch
                if (Phaser.Math.RND.between(0, 1) == 0) continue;
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) continue;
                var sedge = this.scene.manager.objectManager.newObjectToWorld(x, y, 'CREEK_SEDGE');
                if (sedge) {
                    // Randomly flip the sedge to add some visual variety
                    sedge.sprite.setFlipX((Phaser.Math.RND.between(0, 1) == 0));
                    this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MUD.FILL_, x, y, 1, 1);
                }
            }
        }
    }

    buildWoodSorrelPatch(_x, _y, width = 3, height = 3) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking patch
                if (Phaser.Math.RND.between(0, 1) == 0) continue;
                var x = _x + w;
                var y = _y + h;
                var sorrel = this.scene.manager.plantManager.newPlantToWorld(x, y, 'WOOD_SORREL', Phaser.Math.RND.between(1, 30));
                if (sorrel) {
                    // Randomly flip the wood sorrel to add some visual variety
                    sorrel.sprite.setFlipX((Phaser.Math.RND.between(0, 1) == 0));
                }
            }
        }
    }

    buildGully(_x, _y, width = 3, height = 2) {
        var valid_gully = ['GULLY_2X2', 'GULLY_3X2_1', 'GULLY_3X2_2', 'GULLY_5X2'];
        var gully_name = 'GULLY_' + width + 'X' + height;
        if (gully_name == 'GULLY_3X2') {
            gully_name = 'GULLY_3X2_' + Phaser.Math.RND.between(1, 2);
        }
        if (!valid_gully.includes(gully_name)) {
            console.warn("Invalid gully size: " + width + "x" + height);
            return;
        }
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) return;
            }
        }
        var gully = this.scene.manager.objectManager.newObjectToWorld(_x, _y, gully_name);
    }

    buildPond(_x, _y, width = 3, height = 2) {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                // Randomly skip some tiles to create a more natural-looking pond
                var x = _x + w;
                var y = _y + h;
                if (this.isPathTile(x, y)) continue;

                if (Phaser.Math.RND.between(0, 5) == 3) {
                    this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MUD.FILL_, x, y, 1, 1);
                    continue;
                }

                this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.WATER.FILL_, x, y, 1, 1);
            }
        }
    }

    buildRock(_x, _y) {
        if (this.isPathTile(_x, _y)) return;
        this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'ROCK_SMALL');
    }

    buildStump(_x, _y) {
        /// if the tiles are already dirt don't place a stump, since that would overwrite existing paths or clearings
        for (let i = 0; i < 2; i++) {
            if (this.isPathTile(_x+i, _y)) return;
        }
        this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'STUMP_SEAT');
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MULCH.FILL_, _x, _y, 2, 1);
    }

    buildBranch(_x, _y, width = 3, height = 1) {
        var valid_branches = ['BRANCH_3X1', 'BRANCH_5X2'];
        var branch_name = 'BRANCH_' + width + 'X' + height;
        if (!valid_branches.includes(branch_name)) {
            // return a valid branch instead
            if (width < 5 && height == 2) {
                branch_name = 'BRANCH_3X1';
            }
            else if (width == 5 && height != 2) {
                branch_name = 'BRANCH_5X2';
            }
        }
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                var x = _x + w; 
                var y = _y + h;
                if (this.isPathTile(x, y)) return;
            }
        }
        this.scene.manager.objectManager.newObjectToWorld(_x, _y, branch_name);
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MULCH.FILL_, _x, _y, width, height);
    }

    generateRandomPath() {
        const block = this.block;
        /// Generate edge nodes for path start and end points and create consistent edge node positions when blocks are adajacent without a sidewalk and street offset.
        var fixed_nodes = {
            north: [{ x: block.left + 16, y: block.top}, { x: block.right - 8, y: block.top}],
            south: [{ x: block.left + 16, y: block.bottom}, { x: block.right - 8, y: block.bottom}],
            east: [{ x: block.right, y: block.top + 16}, { x: block.right, y: block.bottom - 8}],
            west: [{ x: block.left, y: block.top + 16}, { x: block.left, y: block.bottom - 8}]
        };
        var edge_nodes = [];
        if (block.offset.n > 0) {
            /// block has north offset, so a random node on the north edge of the block is a valid start or end point for a path
            var edge_node_count = Phaser.Math.RND.between(1, 3);
            for (let i = 0; i < edge_node_count; i++) {
                var north_edge_x = Phaser.Math.RND.between(block.left + block.offset.w, block.right - block.offset.e - 1);
                edge_nodes.push({ x: north_edge_x, y: block.top + block.offset.n });
            }
        }
        else {
            /// Block has no north offset, so use fixed edge nodes
            /// Check if the block is at the top edge of the map, and if so, don't push the north edge nodes, since they would be outside the map bounds
            if (block.top > 0) {
                edge_nodes.push(...fixed_nodes.north);
            }
        }
        if (block.offset.s > 0) {
            var edge_node_count = Phaser.Math.RND.between(1, 2);
            for (let i = 0; i < edge_node_count; i++) {
                var south_edge_x = Phaser.Math.RND.between(block.left + block.offset.w, block.right - block.offset.e - 1);
                edge_nodes.push({ x: south_edge_x, y: block.bottom - block.offset.s });
            }
        }
        else {
            if (block.bottom < MAP_CONFIG.HEIGHT) {
                edge_nodes.push(...fixed_nodes.south);
            }
        }
        if (block.offset.e > 0) {
            var edge_node_count = Phaser.Math.RND.between(1, 2);
            for (let i = 0; i < edge_node_count; i++) {
                var east_edge_y = Phaser.Math.RND.between(block.top + block.offset.n, block.bottom - block.offset.s - 1);
                edge_nodes.push({ x: block.right - block.offset.e, y: east_edge_y });
            }
        }
        else {
            if (block.right < MAP_CONFIG.WIDTH) {
                edge_nodes.push(...fixed_nodes.east);
            }
        }
        if (block.offset.w > 0) {
            var edge_node_count = Phaser.Math.RND.between(1, 2);
            for (let i = 0; i < edge_node_count; i++) {
                var west_edge_y = Phaser.Math.RND.between(block.top + block.offset.n, block.bottom - block.offset.s - 1);
                edge_nodes.push({ x: block.left + block.offset.w, y: west_edge_y });
            }
        }
        else {
            if (block.left > 0) {
                edge_nodes.push(...fixed_nodes.west);
            }
        }
        /// Generate random waypoints for the path
        let waypoints = [];
        let numWaypoints = Phaser.Math.RND.between(2, 5);
        for (let i = 0; i < numWaypoints; i++) {
            let x = Phaser.Math.RND.between(block.left + 12, block.right - 12);
            let y = Phaser.Math.RND.between(block.top + 12, block.bottom - 12);
            waypoints.push({ x:x, y:y });
        }
        
        /// Waypoints act as branching nodes for the path, so we can generate a path from the nearest edge node to each waypoint, and then from one waypoint to another random waypoint.
        edge_nodes.forEach(edge_node => {
            let nearest_waypoint = waypoints.reduce((nearest, waypoint) => {
                let nearestDistance = Phaser.Math.Distance.Between(edge_node.x, edge_node.y, nearest.x, nearest.y);
                let waypointDistance = Phaser.Math.Distance.Between(edge_node.x, edge_node.y, waypoint.x, waypoint.y);
                return (waypointDistance < nearestDistance) ? waypoint : nearest;
            });
            /// find whether the nearest_waypoint is east, west, north, south, northeast, northwest, southeast, southwest of the edge_node and build a meandering path to it
            this.buildMeanderingPath(edge_node.x, edge_node.y, nearest_waypoint.x, nearest_waypoint.y);


        });
    }

    buildMeanderingPath(startX, startY, endX, endY) {
        let currentX = startX;
        let currentY = startY;
        
        /// Build a meandering path from start to end by randomly choosing to move horizontally or vertically towards the end point, and occasionally adding a random offset to create a more natural-looking path.
        while (currentX != endX || currentY != endY) {
            let moveHorizontally = Phaser.Math.RND.between(0, 1) == 0;
            if (moveHorizontally && currentX != endX) {
                let step = (endX > currentX) ? 1 : -1;
                currentX += step;
            } else if (!moveHorizontally && currentY != endY) {
                let step = (endY > currentY) ? 1 : -1;
                currentY += step;
            }
            /// Occasionally add a random offset to the path to create a more natural-looking path
            if (Phaser.Math.RND.between(0, 4) == 0) {
                let offsetX = Phaser.Math.RND.between(-1, 1);
                let offsetY = Phaser.Math.RND.between(-1, 1);
                currentX += offsetX;
                currentY += offsetY;
            }
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.DIRT.FILL_, currentX, currentY, Phaser.Math.RND.between(2, 3), Phaser.Math.RND.between(2, 3));
        }
    }

    buildPath(_x, _y, width = 3, height = 1, direction = 'HORIZONTAL') {
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.DIRT.FILL_, _x, _y, width, height);
        /// Lay path borders
        if (direction == 'HORIZONTAL') {
            this.buildBranch(_x, _y - 1, width, 1);
            this.buildBranch(_x, _y + height, width, 1);
        }
    }

    isPathTile(x, y) {
        var tile = this.scene.exterior.getGroundAt(x, y);
        if (tile == undefined) return false;
        if (tile.TYPE == 'DIRT' || tile.TYPE == 
            'CEMENT' || tile.TYPE == 'CURB' || tile.TYPE == 'STAIRS' || tile.TYPE == 'ASPHALT' || tile.TYPE == 'CROSSWALK' || tile.TYPE == 'STREET' || tile.TYPE == 'PLAZA'
        ) return true;
        return false;
    }

    buildForest() {
        const block = this.block;
        const groundLayer = this.scene[this.scene.locale].groundLayer;
        var reserved_tiles = {};
        this.generateRandomPath();
        for (let h = 0; h < block.height - (block.offset.n + block.offset.s); h++) {
            if (this.block.top == 0 && h == 8) {
                var x = block.left + block.offset.w;
                var y = block.top + 8 + block.offset.n;
                this.buildFence(x, y, block.width - (block.offset.w + block.offset.e), 'CHAINLINK_S', 'OPEN');
                this.buildRaspberryPatch(x, y - 1, 8, 3);
                h++;
            }
            for (let w = 0; w < block.width - (block.offset.w + block.offset.e); w++) {
                var x = block.left + w + block.offset.w;
                var y = block.top + h + block.offset.n;
                /// Get the tile at the current position and skip if it's dirt or mulch, since we don't want to overwrite existing paths or clearings
                if (this.isPathTile(x, y)) continue;
                var tile = Phaser.Math.RND.between(0, 256);
                switch (tile) {
                    case 0:
                        var patch_width = Phaser.Math.RND.between(2, 4);
                        this.buildRaspberryPatch(x, y, patch_width, Phaser.Math.RND.between(2, 4));
                        x = x + patch_width;
                        break;
                    case 1:
                        var patch_width = Phaser.Math.RND.between(2, 4);
                        this.buildMilkweedPatch(x, y, patch_width, Phaser.Math.RND.between(2, 4));
                        x = x + patch_width;
                        break;
                    case 2:
                        var patch_width = Phaser.Math.RND.between(2, 4);
                        this.buildFoxtailPatch(x, y, patch_width, Phaser.Math.RND.between(2, 4));
                        x = x + patch_width;
                        break;
                    case 3:
                        var patch_width = Phaser.Math.RND.between(2, 4);
                        this.buildDandelionPatch(x, y, patch_width, Phaser.Math.RND.between(2, 4));
                        x = x + patch_width;
                        break;
                    case 4:
                        var patch_width = Phaser.Math.RND.between(2, 4);
                        this.buildCreekSedgePatch(x, y, patch_width, Phaser.Math.RND.between(2, 4));
                        x = x + patch_width;
                        break;
                    case 5:
                        var gully_width = Phaser.Math.RND.between(2, 5);
                        this.buildGully(x, y, gully_width, 2);
                        x = x + gully_width;
                        break;
                    case 6:
                        var pond_width = Phaser.Math.RND.between(1, 3);
                        this.buildPond(x, y, pond_width, Phaser.Math.RND.between(1, 2));
                        x = x + pond_width;
                        break;
                    case 7:
                        this.buildRock(x,y);
                    break;
                    case 8:
                        this.buildBranch(x, y, Phaser.Math.RND.between(3, 5), Phaser.Math.RND.between(1, 2));
                    break;
                    case 9:
                        this.buildStump(x,y);
                    break;
                    case 10:
                        if (this.isPathTile(x, y)) continue;
                        this.scene.manager.treeManager.newTreeToWorld(x, y + .5, 'ASH');
                        groundLayer.weightedRandomize(TILES.LEAVES.FILL_, x, y, 2, 1);
                        break;
                    case 11:
                        if (this.isPathTile(x, y)) continue;
                        this.scene.manager.treeManager.newTreeToWorld(x, y + .5, 'SUGAR_MAPLE');
                        groundLayer.weightedRandomize(TILES.LEAVES.FILL_, x, y, 2, 1);
                        break;
                    case 19:
                        for (let angle = 0; angle < 360; angle += 45) {
                            let radius = 6;
                            let radian = Phaser.Math.DegToRad(angle);
                            let treeX = x + radius * Math.cos(radian);
                            let treeY = y + radius * Math.sin(radian) + .5;
                            let tileX = Math.floor(treeX);
                            let tileY = Math.floor(treeY);
                            if (this.isPathTile(tileX, tileY)) continue;
                            if (Phaser.Math.RND.between(0, 1) == 0) continue;
                            this.scene.manager.treeManager.newTreeToWorld(treeX, treeY, 'SUGAR_MAPLE');
                            groundLayer.weightedRandomize(TILES.LEAVES.FILL_, Math.floor(treeX), Math.floor(treeY), 2, 1);
                        }
                        w = w + 8;
                        break;
                }
            }
        }
    }

    buildStreetPole(_x, _y, signs = { NS: null, EW: null, STOP: null, CORNER: '', TELEPHONE: false }, light = true) {
        var pole = this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'WOOD_POLE');

        if (light) {
            let sodium = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 6, 'SODIUM');
            sodium.sprite.setDepth(pole.sprite.depth + 1);
        }

          if (signs.NS != null && signs.NS != '') {
            let street_sign_ns = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 4.25, 'STREET_SIGN_NS_');
            street_sign_ns.sprite.setDepth(pole.sprite.depth+1);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_' + signs.CORNER);
        }

        if (signs.EW != null && signs.EW != '') {
            let street_sign_ew = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 3.75, 'STREET_SIGN_EW_');
            street_sign_ew.sprite.setDepth(pole.sprite.depth+1);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_' + signs.CORNER);
        }

       if (signs.STOP != null) {
            let stop_sign = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 2.75, 'STOP_SIGN_'+signs.STOP);
            var behind = signs.STOP == 'N' || signs.STOP == 'E' ? true : false;
            if (behind) {
                stop_sign.sprite.setDepth(pole.sprite.depth-1);
            }
            else {
                stop_sign.sprite.setDepth(pole.sprite.depth+1);
            }
        }

        if (signs.TELEPHONE) {
            let telephone = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 5, 'TELEPHONE_POLE_TOP');
            telephone.sprite.setDepth(pole.sprite.depth+1);
        }
    }

    buildFence(_x, _y, width = 2, prefix = 'WOOD_FENCE', suffix = 'BROWN', horizontal = true) {
        if (width == 0) return;

        if (width > 6) {
            if (width % 6 == 0) {
                var sections = width / 6;
                for (let i = 0; i < sections; i++) {
                    this.buildFence(_x + (i * 6 * (horizontal ? 1 : 0)), _y + (i * 6 * (horizontal ? 0 : 1)), 6, prefix, suffix, horizontal);
                }
                return;
            }
            if (width % 5 == 0) {
                var sections = width / 5;
                for (let i = 0; i < sections; i++) {
                    this.buildFence(_x + (i * 5 * (horizontal ? 1 : 0)), _y + (i * 5 * (horizontal ? 0 : 1)), 5, prefix, suffix, horizontal);
                }
                return;
            }
            if (width % 4 == 0) {
                var sections = width / 4;
                for (let i = 0; i < sections; i++) {
                    this.buildFence(_x + (i * 4 * (horizontal ? 1 : 0)), _y + (i * 4 * (horizontal ? 0 : 1)), 4, prefix, suffix, horizontal);
                }
                return;
            }
            if (width % 3 == 0) {
                var sections = width / 3;
                for (let i = 0; i < sections; i++) {
                    this.buildFence(_x + (i * 3 * (horizontal ? 1 : 0)), _y + (i * 3 * (horizontal ? 0 : 1)), 3, prefix, suffix, horizontal);
                }
                return;
            }
        }

        let orientation = horizontal ? '' : 'VERTICAL_';
        let fence_panel = this.scene.manager.objectManager.newObjectToWorld(_x, _y, prefix + '_' + width + '_' + orientation + suffix);
        if (!horizontal) {
            fence_panel.sprite.setDepth(fence_panel.sprite.depth - 1);
        }
    }

    buildItems() {
        if (!this.useLegacySlotBlockSave) return;
        const save = this.scene.slot?.BLOCKS?.[this.block.x]?.[this.block.y];
        if (save == undefined || !Array.isArray(save.items)) return;

        const itemManager = this.scene.manager.itemManager;

        save.items.forEach(function (item) {
            const contents = [];
            if (Array.isArray(item.items) && item.items.length > 0) {
                item.items.forEach(function (subItem) {
                    const subSlug = subItem?.slug ?? subItem?.info?.slug ?? subItem?.ITEM;
                    if (subSlug != undefined && subSlug !== '') {
                        const built = itemManager.newItem(subSlug);
                        if (built) contents.push(built);
                    }
                });
            }

            const x = parseInt(item.x, 10);
            const y = parseInt(item.y, 10);
            if (!Number.isInteger(x) || !Number.isInteger(y)) return;

            const newItem = itemManager.newItemToWorld(x, y, item.slug, contents);
            if (newItem == false) return;

            if (item.params != undefined && newItem.setParameters != undefined) {
                newItem.setParameters(item.params);
            }
            if (item.stack != undefined && newItem.setStackCount != undefined) {
                newItem.setStackCount(item.stack);
            }
        });
    }

    saveBlock() {
        let save = {
            ground: [],
            walls: [],
            properties: [],
            items: [],
            trees: [],
            plants: [],
            objects: [],
            npcs: []
        };
        let block_width = MAP_CONFIG.blockWidth;
        let block_height = MAP_CONFIG.blockHeight;

        const groundLayer = this.scene[this.scene.locale].groundLayer;
        for (let y = this.block.block_tile_y; y < this.block.block_tile_y + block_height; y++) {
            let row = [];
            for (let x = this.block.block_tile_x; x < this.block.block_tile_x + block_width; x++) {
                let tile = groundLayer.getTileAt(x, y);
                row.push(tile != null ? tile.index : -1);
            }
            save.ground.push(row);
        }

        const wallLayer = this.scene[this.scene.locale].wallLayer;
        for (let y = this.block.block_tile_y; y < this.block.block_tile_y + block_height; y++) {
            let row = [];
            for (let x = this.block.block_tile_x; x < this.block.block_tile_x + block_width; x++) {
                let tile = wallLayer.getTileAt(x, y);
                row.push(tile != null ? tile.index : -1);
            }
            save.walls.push(row);
        }

        this.propertyLines.forEach(function (prop, index) {
            save.properties.push(prop.getSaveData());
        });

        const itemRegistry = this.scene?.manager?.itemManager?.registry;
        if (itemRegistry != undefined) {
            const left = this.block.block_tile_x;
            const top = this.block.block_tile_y;
            const right = left + block_width;
            const bottom = top + block_height;

            const serializeNestedItems = (items = []) => {
                const savedItems = [];
                items.forEach(function (nested) {
                    const slug = nested?.slug ?? nested?.info?.slug ?? nested?.ITEM;
                    if (slug != undefined && slug !== '') {
                        savedItems.push({ slug });
                    }
                });
                return savedItems;
            };

            itemRegistry.getAllItems().forEach(function (item) {
                const x = parseInt(item.x, 10);
                const y = parseInt(item.y, 10);
                if (!Number.isInteger(x) || !Number.isInteger(y)) return;

                if (x >= left && y >= top && x < right && y < bottom) {
                    save.items.push({
                        slug: item.slug,
                        x,
                        y,
                        stack: item.stack,
                        items: serializeNestedItems(item.items),
                        params: item.params ?? {},
                    });
                }
            });
        }

        return save;
    }
}
