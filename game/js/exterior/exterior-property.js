import PropertyBlueprint from "./property-blueprint.js";
/* PropertyLine — thin wrapper; all logic lives in PropertyBlueprint */

export default class PropertyLine {

    constructor(scene, prop, wallsBuilt = false) {
        this.scene = scene;
        this.prop = prop;
        this.wallsBuilt = wallsBuilt;

        if (wallsBuilt) {
            const blockSave = scene?.slot?.BLOCKS?.[prop.block.x]?.[prop.block.y];
            if (blockSave == undefined || !Array.isArray(blockSave.properties)) {
                this._blueprint = new PropertyBlueprint(scene, prop, wallsBuilt);
                return;
            }
            var block_properties = blockSave.properties;
            for (var i = 0; i < block_properties.length; i++) {
                if (block_properties[i].address == prop.address) {
                    prop.structure.settings = block_properties[i].structure.settings;
                }
            }
        }

        this._blueprint = new PropertyBlueprint(scene, prop, wallsBuilt);
    }

    plan()         { return this._blueprint.plan(); }
    render(plan)   { return this._blueprint.render(plan); }
    buildIt()      { return this._blueprint.buildIt(); }
    getFrontDoor() { return this._blueprint.getFrontDoor(); }
    getSaveData()  { return this._blueprint.getSaveData(); }
    showIt()       { return this._blueprint.showIt(); }
}
