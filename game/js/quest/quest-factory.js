import QUESTS from "../config/atlas/quest.js";

/* Quest Factory Class */

export default class QuestFactory {

    constructor() {
        this.valid_quest = QUESTS;
    }


    getQuest (id) {
        if (this.validQuest(id)) {
            return this.valid_quest[id];
        }
        return false;
    }

    validQuest (id) {
        if (this.valid_quest.hasOwnProperty(id)) {
            return true;
        }
        else {
            console.warn("Nonvalid quest id passed in quest factory: "+id);
        }
    }

    discardQuest (quest) {
        quest.destroy();
    }

    
}