/* Keychain Class */

export default class Keychain {


    constructor(save_data) {
        this.keys = save_data;
    }

    addKey (address, count=1, slug=null) {
        if (this.findKey(address)) {
            return this.amendKey(address, count);
           
        }
        else {
            if (slug == null) {
                var slug = "KEY_"+(Phaser.Math.Between(1, 12));
            }
            console.log("Adding key:", address, slug, count);
                this.keys.push({"ADDRESS": address, "SLUG": slug, "COUNT": count});
        }
        
    }
    

    removeKey (address, count=1) {
        let key = this.findKey(address);
        if (key) {
            key.count -= count;
            if (key.count <= 0) {
                this.keys = this.keys.filter(k => k.address !== address);
            }
            return true;
        }
        return false;
    }   

    amendKey (address, count) {
        let key = this.findKey(address);
        if (key) {
            console.log(key);
            key.COUNT += count;
            return true;
        }
        return false;
    }

    findKey (address) {
        return this.keys.find(key => key.ADDRESS === address);
    }

    getKey (index=0) {
        return this.keys[index];
    }

    getKeyCount () {
        let count = 0;
        for (let key of this.keys) {
            count += key.COUNT;
        }
        return count;
    }
}