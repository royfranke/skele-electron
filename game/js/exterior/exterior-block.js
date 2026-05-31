import BlockBlueprint from "./block-blueprint.js";
/* Block — thin wrapper; all logic lives in BlockBlueprint */

export default class Block {

    constructor(scene, block) {
        this.scene = scene;
        this.block = block;
        this._blueprint = new BlockBlueprint(scene, block);
        this.wallsBuilt = this._blueprint.wallsBuilt;
        this.propertyLines = this._blueprint.propertyLines;
    }

    addPropertyLine(prop)  { return this._blueprint.addPropertyLine(prop); }
    buildProperties()      { return this._blueprint.buildProperties(); }
    buildObjects()         { return this._blueprint.buildObjects(); }
    buildItems()           { return this._blueprint.buildItems(); }
    saveBlock()            { return this._blueprint.saveBlock(); }
    getAdjoiningNodes(x,y) { return this._blueprint.getAdjoiningNodes(x, y); }
}
