/* Knowledge Data Manager Class */

export default class KnowledgeManager {

    constructor(scene) {
        this.scene = scene;
        this.knows = this.scene.slot.KNOWLEDGE;
    }

    learn (category, morsel) {
        if (!this.knows[category]) {
            console.log("Knowledge category not found: "+ category);
        }

        let found = false;
        for (let [key, value] of Object.entries(this.knows[category])) {
            if (key === morsel.x+"_"+morsel.y) {
                found = true;
                break;
            }
        }
        if (!found) {
            if (this.scene.manager.hud !== undefined && this.scene.manager.hud !== null) {
                if (this.scene.manager.hud.hudNotebook !== undefined) {
                    this.knows[category][morsel.x+"_"+morsel.y] = morsel;
                    this.learned(category,morsel);
                }
            }
        }
    }

    learned (category, morsel) {
        console.log("Learned: "+category+" - "+morsel.name);
        this.scene.manager.hud.hudNotebook.manager.notebook.addPage(category, morsel.name);
    }

    setSaveFromKnowledge() {
        return this.knows;
    }


}
