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
    

    newTree (slug,items=[]) {
        return this.factory.newTree(slug,items);
    }

    treeInfo (slug) {
        return this.factory.treeInfo(slug);
    }

    discardTree (tree) {
        tree.destroy();
    }

    newTreeToWorld (_x,_y,slug,days_old=0) {
        var tree = this.newTree(slug,days_old);
        var result = this.putTreeInWorld(tree,_x,_y);
        if (!result) {
            console.warn('Could not put this tree in the world from tree manager: '+slug);
            return false;
        }
        
        return true;
    }

    putTreeInWorld (tree, _x, _y) {
        return this.registry.placeTree(tree,_x,_y);
    }


}