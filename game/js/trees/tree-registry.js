import KEYLIGHTS from "../config/key-light.js";
/* Tree Registry */
/* Manages trees in the world */

export default class TreeRegistry {

    constructor() {
        this.registry = {};
    }


    updateLights(light) {
        Object.entries(this.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    value.setLight(KEYLIGHTS[light]);
                });
            }
        });
    }


    dirtySlot(_x, _y) {
        return (_x + "_" + _y in this.registry);
    }

    getTrees(_x, _y) {
        if (!this.placeEmpty(_x, _y)) {
            return this.registry[_x + "_" + _y];
        }
        return null;
    }

    placeEmpty(_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x + "_" + _y] == null;
        }
        else {
            return true;
        }
    }

    placeTree(tree, _x, _y) {
        if (!this.placeEmpty(_x, _y)) {
            tree.setRegistration(false);
            return false;
        }
        var added = this.addTree(tree, _x, _y);
        tree.setRegistration(added, { x: _x, y: _y });
        return added;
        /// Should be feedback for when a tree cannot be placed (for now the only condition is that another tree cannot already be on the tile)
    }

    addTree(tree, _x, _y) {
        // Do not refer to this directly, use placetree
        if (this.placeEmpty(_x, _y)) {
            this.registry[_x + "_" + _y] = [];
        }
        else {
            return false;
        }
        this.registry[_x + "_" + _y].push(tree);
        if (tree.info == undefined) {
            console.warn('Tree does not have an info property');
            console.warn(tree);
        }

        try {
            if (tree?.scene?.locale === 'exterior' && tree?.scene?.exterior?.refreshChunkCollisionAtTile) {
                tree.scene.exterior.refreshChunkCollisionAtTile(_x, _y);
            }
        } catch (e) {}

        return true;
    }

    removeTrees(_x, _y, options = {}) {
        if (!this.placeEmpty(_x, _y)) {
            var trees = this.registry[_x + "_" + _y];
            trees.forEach(tree => {
                tree.setRegistration(false);
            });
            this.registry[_x + "_" + _y] = null;

            if (this.registry.hasOwnProperty(_x + "_" + _y)) {
                // Remove the key-value pair
                delete this.registry[_x + "_" + _y];
            }
            if (options?.syncChunk === true) {
                try {
                    const worldSystem = (typeof window !== 'undefined') ? window.WorldSystemInstance : null;
                    const cm = worldSystem ? worldSystem.chunkManager : null;
                    if (cm) {
                        const chunk = cm.getChunkAtTile(_x, _y);
                        if (chunk) {
                            const local = chunk.worldToLocal(_x, _y);
                            if (local) {
                                const treesInChunk = (typeof chunk.getTrees === 'function') ? chunk.getTrees() : (chunk.getEntitiesByKind ? chunk.getEntitiesByKind('tree') : []);
                                if (Array.isArray(treesInChunk)) {
                                    treesInChunk.forEach(p => {
                                        try { chunk.removeTree(p.slug || p.slugName || p.name || p.kind, local.x, local.y); } catch (e) {}
                                    });
                                    try { if (worldSystem && typeof worldSystem.markDirty === 'function') worldSystem.markDirty(chunk); else chunk.dirty = true; } catch (e) {}
                                }
                            }
                        }
                    }
                } catch (e) {}
            }
            try {
                const scene = trees?.[0]?.scene;
                if (scene?.locale === 'exterior' && scene?.exterior?.refreshChunkCollisionAtTile) {
                    scene.exterior.refreshChunkCollisionAtTile(_x, _y);
                }
            } catch (e) {}
            return true;
        }
        else {
            // This spot was already empty
            return false;
        }
    }

}