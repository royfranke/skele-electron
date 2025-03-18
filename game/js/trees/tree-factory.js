import Tree from "../object/tree.js";
import TREES from "../config/atlas/trees.js";
/* Tree Factory Class */

export default class TreeFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_trees = TREES;
    }

    treeInfo (slug) {
        if (this.validTree(slug)) {
            return this.valid_trees[slug]; /// Returns a non-sprite info set obj
        }
        return false;
    }

    newTree (slug) {
        if (this.validTree(slug)) {
            return new Tree(this.scene,this.valid_trees[slug]); /// Returns a non-sprite obj
        }
        else {
            console.warn("Nonvalid tree slug passed in tree factory: "+slug);
        }
        return false;
    }

    validTree (slug) {
        if (this.valid_trees.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid tree slug passed in tree factory: "+slug);
        }
    }

    discardTree (tree) {
        tree.destroy();
    }

    
}