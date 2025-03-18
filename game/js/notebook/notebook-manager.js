import Notebook from "./notebook.js";
/* Notebook Cards Manager Class */

export default class NotebookManager {

    constructor(scene) {
        this.scene = scene;
        this.notebook = new Notebook(this.scene.slot.NOTEBOOKS);
        this.selected = 0;
    }

    setSaveFromNotebook() {
        return {
            "STATUS": {
                "CURRENT": {
                    "NOTEBOOK": 1
                }
            },
            "NOTEBOOK1": {
                "PAGES": this.notebook.pages,
                "SPECS": {
                    "COLOR": "RED"
                },
                "EPHEMERA": {
                }
            }
        };
    }

    selectNext() {
        this.setSelected(this.selected + 1);
        this.scene.manager.hud.hudNotebook.arrowRight();
    }

    selectPrevious() {
        this.setSelected(this.selected - 1);
        this.scene.manager.hud.hudNotebook.arrowLeft();
    }

    setSelected(selected = 0) {

        if (selected >= this.notebook.pages.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.notebook.pages.length - 1;
        }
        this.last_selected = this.selected;
        this.selected = selected;

        this.scene.manager.hud.hudNotebook.drawPage(this.selected);
    }

    listen () {
        var callback_left = function () {
            this.selectPrevious();
        }
        var callback_right = function () {
            this.selectNext();
        }
        this.scene.events.addListener('INPUT_LEFT_NOTEBOOK', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_NOTEBOOK', callback_right, this);
   }

   destroyListeners () {
        this.scene.events.off('INPUT_LEFT_NOTEBOOK');
        this.scene.events.off('INPUT_RIGHT_NOTEBOOK');
   }

}
