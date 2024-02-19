import Object from "../object/object.js";
import ObjectChest from "../object/object-chest.js";
import OBJECTS from "../config/atlas/objects.js";
/* Object Factory Class */

export default class ObjectFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_objects = OBJECTS;
    }

    objectInfo (slug) {
        if (this.validObject(slug)) {
            return this.valid_objects[slug]; /// Returns a non-sprite info set
        }
        return false;
    }

    newObject (slug,items=[]) {
        if (this.validObject(slug)) {
            if (this.valid_objects[slug].type == 'CHEST') {
                var object = new ObjectChest(this.scene,this.valid_objects[slug],items);
            }
            else {
                var object = new Object(this.scene,this.valid_objects[slug]);
            }
            
            return object; /// Returns a non-sprite obj
        }
        return false;
    }

    validObject (slug) {
        if (this.valid_objects.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid object slug passed in object factory: "+slug);
        }
    }

    discardObject (object) {
        object.destroy();
    }

    
}