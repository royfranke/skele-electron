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
        this.registry[_x + "_" + _y].push(tree);
        if (tree.info == undefined) {
            console.warn('Tree does not have an info property');
            console.warn(tree);
        }

        return true;
    }

    removeTrees(_x, _y) {
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
            return true;
        }
        else {
            // This spot was already empty
            return false;
        }
    }

}