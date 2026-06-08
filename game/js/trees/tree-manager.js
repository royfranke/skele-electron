import TreeFactory from "./tree-factory.js";
import TreeRegistry from "./tree-registry.js";


/* Tree Manager Class */

export default class TreeManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new TreeFactory(this.scene);
        this.registry = new TreeRegistry();

        this.locale = this.scene[this.scene.place];

    }

    update () {

    }

    setCollider() {
        var self = this;
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    
                        value.setCollision();
                    
                });
            }
        });
        
    }
    

    newTree (slug) {
        return this.factory.newTree(slug);
    }

    treeInfo (slug) {
        return this.factory.treeInfo(slug);
    }

    discardTree (tree) {
        tree.destroy();
    }

    newTreeToWorld (_x,_y,slug,days_old=0, options = {}) {
        var tree = this.newTree(slug,days_old);
        var result = this.putTreeInWorld(tree,_x,_y, options);
        if (!result) {
            try { tree.destroy(); } catch (e) {}
            console.warn('Could not put this tree in the world from tree manager: '+slug);
            return false;
        }

        return result; // return the tree instance on success
    }

    putTreeInWorld (tree, _x, _y, options = {}) {
        const added = this.registry.placeTree(tree, _x, _y);
        if (!added) return false;

        // Also register tree metadata in chunk storage when available
        try {
            const syncChunk = options?.syncChunk !== false;
            if (syncChunk) {
                const cm = this.scene?.exterior?.chunkManager;
                const worldSystem = this.scene?.exterior?.worldSystem || (typeof window !== 'undefined' ? window.WorldSystemInstance : null);
                if (cm) {
                    const chunk = cm.getChunkAtTile(_x, _y);
                    if (chunk) {
                        const local = chunk.worldToLocal(_x, _y);
                        if (local) {
                            const slug = tree?.info?.slug ?? tree?.name ?? 'UNKNOWN';
                            chunk.addTree(slug, local.x, local.y, { age_days: tree.day });
                            if (worldSystem && typeof worldSystem.markDirty === 'function') {
                                try { worldSystem.markDirty(chunk); } catch (e) {}
                            } else {
                                try { chunk.dirty = true; } catch (e) {}
                            }
                        }
                    }
                }
            }
        } catch (e) {}

        return tree;
    }


}