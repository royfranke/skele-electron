import HudCommon from '../hud/hud-common.js';
import AppManager from '../app/app-manager.js';
import ITEMS from '../config/atlas/items.js';

/**
 * Main Menu Scene
 */
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Main Menu");
    }


    init (data) {
        this.data = data;
    }

    create() {
        console.log("Main Menu Scene");
        this.version = '1.2.1';
        this.data.settings = this.cache.json.get('SETTINGSCONFIG');
        this.ITEMS = ITEMS;

        this.app = new AppManager(this,'MAIN');
        this.camera = this.app.camera;
        this.hud = new HudCommon(this);
        this.items_shown = [];
        this.cursor_hover = { cursor: 'url(assets/images/cursor-hover.png), pointer' };
        this.assembleBackground();
        this.assembleMenu();
        this.assembleTitle();
        this.assembleVersion();
        this.assembleItemGrid();

        this.input.setDefaultCursor('url(assets/images/cursor.png), pointer');
        
    }


    assembleItemGrid() {
        /// Draw a grid of items for the background

        let itemWidth = 18;
        let itemHeight = 18;
        let rows = Math.ceil((this.camera.view.height - 32) / itemHeight);
        let cols = 3;
        let left = this.camera.view.left + 8;

        for (let side = 0; side < 2; side++) {
            if (side === 1) {
                left = this.camera.view.right - (cols * itemWidth) - 8;
            }
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let sprite = this.add.sprite(left + (col * itemWidth), this.camera.view.top + 8 + (row * itemHeight), 'ITEMS', this.getRandomItem(), 0).setOrigin(0,0).setDepth(100);
                }
            }
        }

    }

    getRandomItem() {
        let keys = Object.keys(this.ITEMS);
        let randomKey = keys[Math.floor(Math.random() * keys.length)];
        if (this.ITEMS[randomKey].containedBy.length > 0) {
            // If the item is contained by another item, get another random item
            return this.getRandomItem();
        }
        if (this.items_shown.includes(randomKey)) {
            // If the item has already been shown, get another random item
            return this.getRandomItem();
        }
        // Add the item to the list of shown items
        this.items_shown.push(randomKey);
        return randomKey;
    }

    assembleVersion() {
        let version = this.add.bitmapText(this.camera.view.left + this.camera.view.margin.left + 56, this.camera.view.bottom - 24, 'SkeleNotebook', this.version);
        version.setOrigin(0,0);
        version.setFontSize(8);
        version.setTintFill(0xb29638);
        version.setDepth(1);
    }

    assembleBackground() {
        let background = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BLOCK_MID_SAPPHIRE_FAT_BORDER');
        background.setDepth(1);

        let background_frame = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BLOCK_SHALLOW_RED_EDGE_FRAME');

        let menu_background = this.hud.makeBlock(this.cameras.main.centerX - 100, this.camera.view.top + (this.camera.view.height * .40), 200, 120, 'BLOCK_MID_ORANGE_FAT_BORDER');
        menu_background.setDepth(2);

        let menu_frame = this.hud.makeBlock(this.cameras.main.centerX - 100, this.camera.view.top + (this.camera.view.height * .40), 200, 120, 'BLOCK_SHALLOW_YELLOW_EDGE_FRAME');

    }

    assembleTitle() {
        var rainbow = [];
        let start_top = this.camera.view.top + (this.camera.view.height * .28);
        let start_left = this.cameras.main.centerX;
        let color = ['0x4973a5','0x32675a','0x4973a5', '0x3d56d2','0x4973a5', '0x7758ab','0x4973a5', '0x974d9e','0x4973a5', '0xd93232','0x4973a5', '0xf47832','0x4973a5', '0xed931e','0x4973a5', '0xf2b22b', '0x4973a5', '0xf8d239'];
        for (var i = 0; i < color.length; i++) {
            let title = this.add.bitmapText(start_left + (1 * i), start_top - (1 * i), 'SkelePuff', 'SUMMER BREAK');
            title.setDepth(100 + i);
            title.setOrigin(0.5);
            title.setTintFill(color[i]);
            title.setFontSize(32);
            if (color[i] === '0x4973a5') {
                title.setAlpha(0.5); // Dim the separator color
            }
            rainbow.push(title);
        }
        // Add tween with a staggered start
        

        this.tweens.add({
            targets: rainbow,
            y: "-=12",
            duration: 4000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: function (target, key, value, index, total)
            {
                return index * 125; // Stagger the start of each tween by 100ms
            }
        });
        
    }

    assembleMenu () {

        let menuItems = [{display: "Play", action: () => this.start("Load Game",this.data)},
                         {display: "Settings", action: () => this.start("System Settings",this.data)},
                         {display: "Quit", action: () => this.game.destroy(true)}];
        let menu = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        menu.setDepth(20);
        let yOffset = 0;
        menuItems.forEach(item => {
            var text = this.add.bitmapText(0, yOffset, 'SkeleNotebook', item.display);
            text.setOrigin(0.5);
            text.setTintFill(0x5a735b);
            text.setInteractive(this.cursor_hover);
            text.on('pointerdown', item.action);
            text.on('pointerover', function (pointer) {
                text.setTintFill(0xc3b572);

            });
            text.on('pointerout', function (pointer) {
                text.setTintFill(0x5a735b);

            });

            menu.add(text);
            yOffset += 32; // Spacing between items
        });


    }

    start (scene_name,data) {
        this.scene.stop("Main Menu");
        this.scene.start(scene_name, data);
    }

    update () {

    }
}
