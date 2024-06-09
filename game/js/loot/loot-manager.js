/**
 *	Manage loot dispensation (coins, items, etc)
 */
 export default class LootManager {
    

    constructor(scene) {
        this.scene = scene;

    }

    digUp(_x,_y) {
        //this.scene.manager.fx.playFX('CLOUD_DUST_',_x+8,_y+8,500);
        /// Get odds on this tile from somewhere
        const yielded = [1,1,1,1,5,5,10,10,25,25];
        var empties = Phaser.Math.RND.between(4, 20);
        
        for (var i=0;i<empties;i++) {
          yielded.push(0)
        }
        
        Phaser.Utils.Array.Shuffle(yielded);
        if (yielded[0] > 0) {
            setTimeout(() => {
                console.log("Coin: "+_x+","+_y+" "+yielded[0]);
                this.scene.player.addCoin(yielded[0]);
                this.scene.manager.fx.coinUp(_x*16,_y*16,yielded[0]);
            }, 250);
        }
    }
    
    
}