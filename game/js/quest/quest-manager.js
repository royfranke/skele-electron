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
        // Check if this quest has already been given/completed/abandoned
        // If not, add it to the current quest log
        // If so, return false
        if (this.questLog.current.length > 0) {
            for (var i = 0; i < this.questLog.current.length; i++) {
                if (this.questLog.current[i] == id) {
                    return false;
                }
            }
            this.questLog.complete.forEach(quest => {
                if (quest == id) {
                    return false;
                }
            });
            this.questLog.abandoned.forEach(quest => {
                if (quest == id) {
                    return false;
                }
            });
        }
        var quest = this.getQuest(id);
        return this.addQuest(quest);
        
    }

    getQuest (id) {
        return this.factory.getQuest(id);
    }


    addQuest (quest,hud=true) {
        console.log(quest);
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

    completeQuest (place=0) {
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
            this.completeQuest();
            console.log('REQ_' + req_id + '_MET!');
        }
        console.log('REQ_' + req_id + '_MET SET');
        this.scene.events.addListener('REQ_' + req_id + '_MET', callback, this, true);
   }



    
}