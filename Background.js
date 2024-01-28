import Settings from './Settings.js';

export default class Background{

    constructor(app){

        this.app = app;

        this.sun = PIXI.Sprite.from(Settings.SPRITE_SUN);
        this.sun.anchor.set(0.5);
        this.sun.x = 0;
        this.sun.y = 0;

        this.app.stage.addChild(this.sun);
    }
}