import MONEY from "../reference/money.js";

/**
 * 	Manages what is in the player's coinpurse
 *	
 */
export default class PlayerCoinpurse {

    constructor() {

        this.coinRef = MONEY.COIN;
        this.paperRef = MONEY.PAPER;
        this.total = 0;
    }

    setSaveFromCoinpurse () {
            return this.contents;
    }

    setContents (contents) {
        this.contents = contents;
        this.updateTotal();
    }

    replaceContents (contents) {
        this.contents.PAPER = contents.PAPER;
        this.contents.COIN = contents.COIN;
        this.updateTotal();
    }

    availableCoins (coin_amount_array) {
        let available = { ...this.contents.COIN };
        const coinRef = this.coinRef;
        let valid = true;
        for (const el of coin_amount_array) {
            let coin = coinRef[el];
            if (available[coin] > 0) {
                available[coin]--;
            }
            else {
                valid = false;
                break;
            }
          }
        return valid;
    }

    availableDollars (dollar_amount_array) {
        let available = { ...this.contents.PAPER };
        const paperRef = this.paperRef;
        let valid = true;
        for (const el of dollar_amount_array) {
            let paper = paperRef[el];
            if (available[paper] > 0) {
                available[paper]--;
            }
            else {
                valid = false;
                break;
            }
          }
        return valid;
    }
    

    availableAmount (amount) {
        return this.total - amount >= 0;
    }

    getMissing (coin_amount_array) {
        let available = { ...this.contents.COIN };
        const coinRef = this.coinRef;
        let missing = [];
        for (const el of coin_amount_array) {
            let coin = coinRef[el];
            if (available[coin] > 0) {
                available[coin]--;
            }
            else {
                missing.push(coin);
            }
          }
        return missing;
    }

    insertCoins (coin_amount_array) {
        if (this.availableCoins(coin_amount_array)) {
            this.removeCoins(coin_amount_array);
            return true;
        }
        else {
            let missing = this.getMissing(coin_amount_array);
            // TODO: Fix to use hud
            this.scene.manager.hud.think('I need a '+missing[0]+'.');
            return false;
        }
    }

    formatMoney (amount) {
        return amount < 100 ? amount+'¢' : '$'+(amount/100).toFixed(2);
    }

    removeCoins (coin_amount_array) {
        let spent = 0;
        coin_amount_array.forEach(element => {
            this.removeCoin(element);
            spent = parseInt(element + spent);
        });
        let spent_formatted = this.formatMoney(spent);
        this.updateTotal();
    }

    removeDollars (dollar_amount_array) {
        let spent = 0;
        dollar_amount_array.forEach(element => {
            this.removeDollar(element);
            spent = parseInt(element + spent);
        });
        let spent_formatted = this.formatMoney(spent);
        this.updateTotal();
    }

    removeCoin (coin_amount) {
        let coin = this.coinRef[coin_amount];
        this.contents.COIN[coin]--;
        //this.updateTotal();
    }

    removeDollar (amount) {
        let paper = this.paperRef[amount];
        this.contents.PAPER[paper]--;
        //this.updateTotal();
    }

    addCoin (coin_amount) {
        let coin = this.coinRef[coin_amount];
        this.contents.COIN[coin]++;
        let amount_string = coin_amount;
        this.updateTotal();
    }

    addDollar (amount) {
        let paper = this.paperRef[amount];
        this.contents.PAPER[paper]++;
        this.updateTotal();
    }


    updateTotal () {
        this.total = 0;
          for (const [key, value] of Object.entries(this.contents.COIN)) {
            this.total += value*this.coinRef[key];
          }
          for (const [key, value] of Object.entries(this.contents.PAPER)) {
            this.total += value*this.paperRef[key];
          }
        return this.total;
    }

    getFormattedTotal () {
        var total = this.updateTotal();
        return this.formatMoney(total);
    }

    getTalliedTotal () {
        this.total = [];
          for (const [key, value] of Object.entries(this.contents.COIN)) {
            this.total.push({text: value, icon: this.coinRef[key]});
          }
          for (const [key, value] of Object.entries(this.contents.PAPER)) {
            this.total.push({text: value, icon: this.paperRef[key]});
          }
        return this.total;
    }

    getTally (contents=[{text: 1, icon: 1}]) {
        let tally = [];
        contents.forEach(coin => {
            console.log(coin);
            if (coin.text > 0) {
                tally.push({
                    text: coin.text, 
                    icon: coin.icon
                });
            }
        });
        return tally;
    }

}