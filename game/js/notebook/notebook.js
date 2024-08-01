/* Notebook Class */

export default class Notebook {


    constructor() {
        this.pages = [
            {
                title: "Shopping List",
                content: " - Milk\n - Eggs\n - Cereal"
            },
            {
                title: "Chores",
                content: "1. Laundry\n2. Dishes\n3. Weed garden"
            },
            {
                title: "Curses",
                content: "#$!&@*\n%#@&$!\n!#$*"
            },
            {
                title: "Phone Numbers",
                content: "Mom: 555-1213\nAuntie: 555-1212"
            },
            {
                title: "Homework",
                content: "\"Safe Summer Workbook\"\n - Look both ways or die\n - Don't talk to strangers!!"
            }
        ];
    }

    getPage (index=0) {
        console.log(this.pages[index]);
        return this.pages[index];
    }
}