import MONEY from "../reference/money.js";
/**
 * 	Makes effects happen
 *	
 */
 export default class GameFX {

    constructor(scene) {
        this.scene = scene;
        this.coinRef = MONEY.COIN;        
    }

    dustUp(_x,_y,delay=0) {
        setTimeout(() => {
            const dust = this.scene.add.sprite(_x + 14, _y + 14, "dust", 0);
            dust.setDepth(_y + dust.height);
            dust.anims.play("dust_cloud", false);
            dust.once('animationcomplete', () => {
                dust.destroy()
            })
        }, delay);
    }

    itemWoosh(_x,_y,delay=0) {
        console.log('test');
        setTimeout(() => {
            const woosh = this.scene.add.sprite(_x, _y, "fx_item", 0).setScrollFactor(0).setOrigin(0);
            woosh.setDepth(200000);
            woosh.anims.play("fx_woosh", false);
            woosh.once('animationcomplete', () => {
                woosh.destroy()
            })
        }, delay);
    }


    coinUp(_x,_y,value,source) {
        //const anims = this.scene.anims;
        const coin = this.scene.physics.add.sprite(_x + 8, _y, "coins", 0);
        coin.setDepth(_y);
        coin.anims.play("COIN-"+this.coinRef[value], false);

        const tween = this.scene.add.tween({
            targets: coin,
            y: _y - 32,
            duration: 450,
            yoyo: true,
            ease: 'Sine.easeOut',
            repeat: 1
        });
        
        tween.on('complete', () => {
          coin.destroy()
        });
    }
    
}