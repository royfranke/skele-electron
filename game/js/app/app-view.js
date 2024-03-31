/*
 * Manages application view
 * SPLASH | MAIN | SETTINGS | NEW | LOAD | GAME | TUTORIAL
 */

export default class AppView {

    constructor(scene, view, state_name) {
        this.scene = scene;
        this.view = view;
        this.create(state_name);
    }

    create(state_name) {
        if (state_name === 'SPLASH') {
            this.createSplash();
        }
        if (state_name === 'MAIN') {
            this.createMain();
        }
        if (state_name === 'SETTINGS') {
            this.createSettings();
        }
        if (state_name === 'LOAD') {
            this.createLoad();
        }
    }

    createSplash() {
        /// Splash HTML styled in index.html
        this.scene.add.dom(this.view.left + this.view.width / 1.8, this.view.top + (this.view.height / 2), 'div', '', 'up and at em').setClassName('splash');
    }

    createMain() {

        var start_top = this.view.top + (this.view.height / 1.5);
        var start_left = this.view.left;
        var color = ['#32675a', '#3d56d2', '#7758ab', '#974d9e', '#d93232', '#f47832', '#ed931e', '#f2b22b', '#f8d239'];
        for (var i = 0; i < color.length; i++) {
            this.scene.add.dom(start_left + (4 * i), start_top - (4 * i), 'div', 'animation-delay:' + (i * .5) + 's;width: ' + this.view.width + 'px;color:' + color[i], 'Skele Summer').setOrigin(0).setClassName('title-card');
        }

        this.scene.add.dom(this.view.left, this.view.bottom - 32, 'div', '', 'v.1.0.1 Skele').setOrigin(0).setClassName('footer');
    }

    createSettings() {

        var start_top = this.view.top + (this.view.height / 1.5);
        var start_left = this.view.left;
        var color = ['#32675a', '#3d56d2', '#7758ab', '#974d9e', '#d93232', '#f47832', '#ed931e', '#f2b22b', '#f8d239'];
        for (var i = 0; i < color.length; i++) {
            this.scene.add.dom(start_left + (4 * i), start_top - (4 * i), 'div', 'animation-delay:' + (i * .5) + 's;width: ' + this.view.width + 'px;color:' + color[i], 'Settings').setOrigin(0).setClassName('title-card');
        }

        this.scene.add.dom(this.view.left, this.view.bottom - 32, 'div', '', 'v.1.0.1 Skele').setOrigin(0).setClassName('footer');
    }

    createLoad() {
        
    }

}