import ShopBlueprint from "./shop-blueprint.js";

export default class Shop {

    constructor(scene, propertyLine, wallsBuilt = false, autoBuild = true) {
        this.scene = scene;
        this.prop = propertyLine;
        this.wallsBuilt = wallsBuilt;
        this._blueprint = new ShopBlueprint(scene, propertyLine, wallsBuilt);
        if (autoBuild) {
            this._blueprint.buildIt();
        }
    }

    plan() {
        return this._blueprint.plan();
    }

    render(plan) {
        return this._blueprint.render(plan);
    }

    buildIt() {
        return this._blueprint.buildIt();
    }

    buildShop() {
        return this._blueprint.buildShop();
    }

    bindHoursFromExistingObjects() {
        return this._blueprint.bindHoursFromExistingObjects();
    }

    getFrontDoor() {
        return this._blueprint.front_door;
    }
}