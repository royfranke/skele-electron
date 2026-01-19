import QuestFactory from './quest-factory.js';
/**
 * 	Manages quest log
 *	
 */
 export default class QuestManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new QuestFactory(this.scene);
        this.initialize();  
    }

    initialize () {
        // Initialize quest log
        if (this.scene.slot.QUESTS != undefined) {
            this.loadQuestLog(this.scene.slot.QUESTS);
        }
        else {
            this.questLog = {
                current: [],
                complete: [],
                abandoned: []
            };
        }
        console.log(this.questLog);

        if (this.questLog.current.length > 0) {
            // Load current quests into HUD
            this.questLog.current.forEach(quest_slug => {
                var quest = this.getQuest(quest_slug);
                this.addQuest(quest);
            });
        }   
    }

    findQuestIndex (slug) {
        for (var i = 0; i < this.questLog.current.length; i++) {
            if (this.questLog.current[i] == slug) {
                return i;
            }
        }

        for (var i = 0; i < this.questLog.complete.length; i++) {
            if (this.questLog.complete[i] == slug) {
                return -2;
            }
        }
        return -1;
    }

    triggerQuest (id) {
        var quest = this.getQuest(id);
        return this.addQuest(quest);
    }

    getQuest (id) {
        return this.factory.getQuest(id);
    }


    addQuest (quest,hud=true) {
        var quest_index = this.findQuestIndex(quest.slug);
        if (quest_index > -1) {
            this.scene.manager.hud.hudQuest.addQuest(quest.summary);
            let req_id = 0;
            for (var key in quest.completion){
                req_id = quest.completion[key].req_group;
            }
            this.listen(req_id);
            return false;
        }
        if (quest_index == -2) {
            console.log("QuestManager.addQuest: Quest '"+quest.slug+"' already completed.");
            return false;
        }

        var quest_items = this.grantQuestItems(quest,hud);
        if (quest_items == false) { return 'CLEAR_SPACE'; }
        this.questLog.current.push(quest.slug);
        
        this.scene.manager.hud.hudSound.play('NEW_QUEST');
        if (hud) {
            this.scene.manager.hud.hudQuest.addQuest(quest.summary);
        }
        
        var value = 0;
        for (var key in quest.completion){
            console.log(quest.completion[key]);
            value = quest.completion[key].req_group;
        }
        this.listen(value);
        return true;
    }

    grantQuestItems (quest,hud=true) {
        var item_manager = this.scene.manager.itemManager;
        var items = [];
        var item_space = true;
        quest.giver_items.forEach(item => {
            if (item.items != undefined) {

                item.items.forEach(enclosed_item_slug => {
                    var enclosed_item = item_manager.newItem(enclosed_item_slug);
                    items.push(enclosed_item);
                });
            }
            var result = item_manager.newItemToPockets(item.slug, items);
            if (!result) {
                console.log("QuestManager.grantQuestItems: Could not add item to pockets.");
                item_space = false;
            }

            if (hud) {
                /// Item effect
            }
        });

        return item_space;
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

    completeQuest (req_id) {
        var place = -1;
        var quest = this.getQuestByReqID(req_id);
        if (quest != false) {
            place = this.findQuestIndex(quest.slug);
        }
        if (place > -1) {
            this.completeQuestAtPlace(place);
        }
    }

    getQuestByReqID (req_id) {
        for (var i = 0; i < this.questLog.current.length; i++) {
            var quest = this.getQuest(this.questLog.current[i]);
            var value = 0;
            for (var key in quest.completion){
                value = quest.completion[key].req_group;
            }
            if (value == req_id) {
                return quest;
            }
        }
        return false;
    }   

    completeQuestAtPlace (place=0) {
        if (this.questLog.current.length >= place + 1) {
            var quest = this.questLog.current.splice(place,1);
            this.questLog.complete.push(quest);
            console.log("Quest complete");
            this.scene.manager.hud.hudQuest.closeQuest();
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

    listen (req_id) {
        var callback = function () {
            this.completeQuest(req_id);
            console.log('REQ_' + req_id + '_MET!');
            /// Destroy listener
            this.scene.events.off('REQ_' + req_id + '_MET');
        }
        console.log('REQ_' + req_id + '_MET SET');
        this.scene.events.addListener('REQ_' + req_id + '_MET', callback, this, true);
   }

    saveQuestLog () {
            return this.questLog;
    }

    loadQuestLog (data) {
          this.questLog = data;
    }

    getSaveHeadline () {
        if (this.questLog.current.length > 0) {
            var quest = this.getQuest(this.questLog.current[0]);
            return quest.headline;
        }
        else {
            return 'Not doing nothing';
        }
    }
}