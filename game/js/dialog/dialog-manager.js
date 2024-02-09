import DialogFactory from "./dialog-factory.js";
import DialogRegistry from "./dialog-registry.js";

/* Dialog Manager Class */

export default class DialogManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new DialogFactory(this.scene);
        this.registry = new DialogRegistry();
    }

    newDialog (slug,responses=[]) {
        return this.factory.newDialog(slug,responses);
    }
    
}