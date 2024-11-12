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
    }

    selectPrevious() {
        this.setSelected(this.selected - 1);
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

}
