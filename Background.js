import Settings from './Settings.js';

/** Class representing main game view's background. Add items and/or code to animate them here. */
export default class Background{

    /**
     * Create background.
     * @param {*} app global app object
     */
    constructor(app){

        this.app = app;

        this.sun = PIXI.Sprite.from(Settings.SPRITE_SUN);
        this.sun.anchor.set(0.5);
        this.sun.x = 0;
        this.sun.y = 0;

        this.app.stage.addChild(this.sun);
    }
}