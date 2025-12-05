/* Notebook Class */

export default class Notebook {


    constructor(save_data) {
        this.pages = save_data.PAGES;
    }

    addPage (title, content) {
        if (this.findPage(title)) {
            return this.amendPage(title, content);
        }
        else {
            this.pages.push({title, content});
        }
    }

    amendPage (title, content) {
        let page = this.findPage(title);
        if (page) {
            page.content += content;
            return true;
        }
        return false;
    }

    findPage (title) {
        return this.pages.find(page => page.title === title);
    }

    getPage (index=0) {
        return this.pages[index];
    }
}