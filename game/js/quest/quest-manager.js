import QuestFactory from './quest-factory.js';
/**
 * 	Manages quest log
 *	
 */
 export default class QuestManager {

    constructor(scene) {
        this.scene = scene;

        /// Point this to const DATA js
        this.questLog = {
            current: [],
            complete: [],
            abandoned: []
        };
        this.factory = new QuestFactory(this.scene);
    }

    triggerQuest (id) {
        var quest = this.getQuest(id);
        this.scene.manager.hud.hudQuest.addQuest(quest.summary);
    }

    getQuest (id) {
        return this.factory.getQuest(id);
    }


    addQuest (quest) {
        this.questLog.current.push(quest);
    }

    getCurrentQuest (place=0) {
        if (this.questLog.current.length >= place + 1) {
            return this.questLog.current[place];
        }
        else if (this.questLog.current.length == 0) {
            //console.warn("QuestService.getCurrentQuest: No current quests.");
            return false;
        }
        else {
            console.warn("QuestService.getCurrentQuest: current quest log does not contain a quest at the requested position ("+place+")");
        }
    }

    completeQuest (place=0) {
        if (this.questLog.current.length >= place + 1) {
            var quest = this.questLog.current.splice(place,1);
            this.questLog.complete.push(quest);
        }
        else {
            console.warn("QuestService.completeQuest: current quest log does not contain a quest at the requested position ("+place+")");
        }
    }

    discardQuest (place=0) {
        if (this.questLog.current.length >= place + 1) {
            this.questLog.current.splice(place,1);
        }
        else {
            console.warn("QuestService.discardQuest: current quest log does not contain a quest at the requested position ("+place+")");
        }
    }

    abandonQuest (place=0) {
        if (this.questLog.current.length >= place + 1) {
            var quest = this.questLog.current.splice(place,1);
            this.questLog.abandoned.push(quest);
        }
        else {
            console.warn("QuestService.abandonQuest: current quest log does not contain a quest at the requested position ("+place+")");
        }
    }


    
}