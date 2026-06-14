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
            groundLayer.weightedRandomize(TILES['DIRT'].FILL_, block.left, block.top, block.width, block.height);
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
                    case 12:
                        this.scene.manager.plantManager.newPlantToWorld(x, y, 'DANDELION', Phaser.Math.RND.between(1, 44));
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
            this.buildStreetPole(this.block.right - 1, this.block.bottom - 7, { TELEPHONE: true }, false);
            this.buildStreetPole(this.block.right - 1, this.block.top + 7, { TELEPHONE: true }, false);
        }

        if (this.block.ground.toUpperCase() == 'FOREST') {
            this.buildForest();
        }
    }

    sectionForest() {
        var section = {
            width: Math.floor((this.block.width - (this.block.offset.w + this.block.offset.e)) / 6),
            height: Math.floor((this.block.height - (this.block.offset.n + this.block.offset.s)) / 6),
        };
        var sections = [];
        for (let h = 0; h < 6; h++) {
            for (let w = 0; w < 6; w++) {
                sections.push({
                    density: 0,
                    path: 0,
                    x: w,
                    y: h,
                    left: this.block.left + this.block.offset.w + (w * section.width),
                    top: this.block.top + this.block.offset.n + (h * section.height),
                    width: section.width,
                    height: section.height,
                    direction: ''
                });
            }
        }
        return sections;
    }

    buildForest() {
        const block = this.block;
        const groundLayer = this.scene[this.scene.locale].groundLayer;
        var reserved_tiles = {};

        for (let h = 0; h < block.height - (block.offset.n + block.offset.s); h++) {
            if (this.block.top == 0 && h == 8) {
                var x = block.left + block.offset.w;
                var y = block.top + 8 + block.offset.n;
                this.buildFence(x, y, block.width - (block.offset.w + block.offset.e), 'CHAINLINK_S', 'OPEN');
                h++;
            }
            for (let w = 0; w < block.width - (block.offset.w + block.offset.e); w++) {
                var tile = Phaser.Math.RND.between(0, 256);
                var x = block.left + w + block.offset.w;
                var y = block.top + h + block.offset.n;

                switch (tile) {
                    case 7:
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                        break;
                    case 8:
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 3, 1);
                        this.scene.manager.plantManager.newPlantToWorld(x + 1, y, 'FOXTAIL', Phaser.Math.RND.between(8, 26));
                        this.scene.manager.plantManager.newPlantToWorld(x + 2, y, 'FOXTAIL', Phaser.Math.RND.between(8, 26));
                        this.scene.manager.plantManager.newPlantToWorld(x + 3, y, 'MILKWEED', Phaser.Math.RND.between(4, 55));
                        this.scene.manager.plantManager.newPlantToWorld(x + 4, y + 1, 'MILKWEED', Phaser.Math.RND.between(4, 55));
                        this.scene.manager.plantManager.newPlantToWorld(x + 3, y + 1, 'FOXTAIL', Phaser.Math.RND.between(8, 26));
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x + 2, y + 1, 2, 1);
                        w = w + 3;
                        break;
                    case 9:
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                        break;
                    case 10:
                        this.scene.manager.treeManager.newTreeToWorld(x, y + .5, 'ASH');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                        break;
                    case 11:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'BRANCH_3X1');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x + 1, y, 2, 1);
                        break;
                    case 12:
                        this.scene.manager.plantManager.newPlantToWorld(x, y, 'DANDELION', Phaser.Math.RND.between(1, 44));
                        break;
                    case 13:
                        this.scene.manager.plantManager.newPlantToWorld(x, y, 'WOOD_SORREL', Phaser.Math.RND.between(1, 30));
                        break;
                    case 14:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'STUMP_SEAT');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 2, 1);
                        break;
                    case 15:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'ROCK_SMALL');
                        break;
                    case 16:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'CREEK_SEDGE');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                        this.scene.manager.objectManager.newObjectToWorld(x + 1, y + 1, 'CREEK_SEDGE');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x + 1, y + 1, 2, 1);
                        w = w + 2;
                        break;
                    case 17:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'BRANCH_5X2');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x + 1, y + 1, 3, 1);
                        w = w + 4;
                        break;
                    case 18:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'GULLY_5X2');
                        groundLayer.weightedRandomize(TILES.DIRT.FILL_, x + 1, y + 1, 3, 1);
                        w = w + 4;
                        break;
                    case 19:
                        for (let angle = 0; angle < 360; angle += 45) {
                            let radius = 6;
                            let radian = Phaser.Math.DegToRad(angle);
                            let treeX = x + radius * Math.cos(radian);
                            let treeY = y + radius * Math.sin(radian) + .5;
                            let tileX = Math.floor(treeX);
                            let tileY = Math.floor(treeY);
                            var tile = this.scene.exterior.getGroundAt(tileX, tileY);
                            if (tile == undefined) continue;
                            if (tile.TYPE != 'DIRT' && tile.TYPE != 'MULCH') continue;
                            let reserved = false;
                            for (let checkX = -1; checkX <= 1; checkX++) {
                                for (let checkY = -1; checkY <= 1; checkY++) {
                                    if (reserved_tiles[Math.floor(treeX) + checkX + '-' + (Math.floor(treeY) + checkY)] != undefined) {
                                        reserved = true;
                                    }
                                }
                            }
                            if (reserved) continue;
                            for (let checkX = -1; checkX <= 1; checkX++) {
                                for (let checkY = -1; checkY <= 1; checkY++) {
                                    reserved_tiles[Math.floor(treeX) + checkX + '-' + (Math.floor(treeY) + checkY)] = 1;
                                }
                            }
                            if (Phaser.Math.RND.between(0, 1) == 0) continue;
                            this.scene.manager.treeManager.newTreeToWorld(treeX, treeY, 'SUGAR_MAPLE');
                            groundLayer.weightedRandomize(TILES.MULCH.FILL_, Math.floor(treeX), Math.floor(treeY), 1, 1);
                        }
                        w = w + 8;
                        break;
                    case 20:
                        groundLayer.weightedRandomize(TILES.WATER.FILL_, x, y, 3, 1);
                        groundLayer.weightedRandomize(TILES.WATER.FILL_, x + 1, y + 1, 3, 1);
                        break;
                    case 21:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'GULLY_3X2_1');
                        groundLayer.weightedRandomize(TILES.DIRT.FILL_, x + 1, y + 1, 3, 1);
                        w = w + 3;
                        break;
                    case 22:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'GULLY_3X2_2');
                        groundLayer.weightedRandomize(TILES.DIRT.FILL_, x + 1, y + 1, 3, 1);
                        w = w + 3;
                        break;
                    case 23:
                        this.scene.manager.objectManager.newObjectToWorld(x, y, 'GULLY_2X2');
                        groundLayer.weightedRandomize(TILES.DIRT.FILL_, x + 1, y + 1, 2, 1);
                        w = w + 2;
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
