/**
 *	Manage loot dispensation (coins, items, etc)
 */
 export default class LootManager {
    

    constructor(scene) {
        this.scene = scene;
    }

    processLootOdds(loot,_x,_y) {
        /*
        loot = {
            id: 1,
            name: 'Payphone Coin Return',
            slug: 'PAYPHONE_RETURN',
            odds: 0.25,
            money: 25,
            actionTrigger: 'check coin return',
            items: [],
            occurrences: 1,
            occurrencePeriod: 'HOUR',
            occurrencePer: 'OBJ_INSTANCE'
        }
        */
        var empties = 1/loot.odds;
        var yielded = [];
        if (loot.money > 0) {
            yielded.push(loot.money);
            empties -= 1;
        }
        if (loot.items && loot.items.length > 0) {
            loot.items.forEach(item => {
                yielded.push(item);
            });
        }
        
        for (var i=0;i<empties;i++) {
            yielded.push(0)
        }

        Phaser.Utils.Array.Shuffle(yielded);
        if (yielded[0] != 0 && Number.isInteger(yielded[0])) {
            this.scene.time.addEvent({
                delay: 250,
                loop: false,
                callback: () => {
                    this.scene.manager.hud.hudCoinpurse.popCoin(yielded[0]);

                    if (yielded[0] < 100) {
                        this.scene.player.coinpurse.addCoin(yielded[0]);
                        
                        this.scene.manager.fx.coinUp(_x*16,_y*16,yielded[0]);
                    }
                    else {
                        this.scene.player.addDollar(yielded[0]);

                        this.scene.manager.fx.dollarUp(_x*16,_y*16,yielded[0]/100);
                    }
                }
            })
        }
        else if (yielded[0] == 0) {
            this.scene.manager.hud.hudThinking.tellBrain('There\'s nothing here.');
            //this.scene.manager.hud.hudHealth.modifyHealth(-0.5);
        }
        else { /// It's an item
            /// Try to add item to pockets
            var result = this.scene.manager.itemManager.newItemToPockets(yielded[0]);
            if (!result) {
                this.scene.manager.hud.hudThinking.tellBrain('My pockets are full.');
                
            }
        }
    }

    digUp(_x,_y) {
        //this.scene.manager.fx.playFX('CLOUD_DUST_',_x+8,_y+8,500);
        /// Get odds on this tile from somewhere
        const yielded = [1,1,1,1,5,5,10,10,25,25,100,200,500,1000,2000,5000];
        var empties = Phaser.Math.RND.between(4, 20);
        
        for (var i=0;i<empties;i++) {
          yielded.push(0)
        }
        
        Phaser.Utils.Array.Shuffle(yielded);
        if (yielded[0] > 0) {
            setTimeout(() => {
                this.scene.manager.hud.hudCoinpurse.popCoin(yielded[0]);

                if (yielded[0] < 100) {
                    this.scene.player.coinpurse.addCoin(yielded[0]);
                    
                    this.scene.manager.fx.coinUp(_x*16,_y*16,yielded[0]);
                }
                else {
                    this.scene.player.coinpurse.addDollar(yielded[0]);

                    this.scene.manager.fx.dollarUp(_x*16,_y*16,yielded[0]/100);
                }
            }, 250);
        }
    }
    
    
}