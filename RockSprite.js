import InteractiveSprite from './InteractiveSprite.js';
import Settings from './Settings.js';
import UserInterface from './UserInterface.js';

export default class RockSprite extends InteractiveSprite{

    static ROCK_NUM = 0;

    constructor(app, objects){

        super(app, objects);

        this.scale = Math.random();
        this.scale = (this.scale < 0.3) ? 0.3 : this.scale;
        this.type = 'rock';
        this.ship = this.objects[0];

        this.directionX = (Math.random() * 2) - 1;
        this.directionY = (Math.random() * 2) - 1;
        this.speed = Settings.ROCK_SPEED_LIMIT;
        
        this.sprite = PIXI.Sprite.from(Settings.SPRITE_ROCK);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.x = this.scale;
        this.sprite.scale.y = this.scale;
        this.sprite.x = this.app.screen.width;
        this.sprite.y = this.app.screen.height;
        this.sprite.zIndex = 2;

        this.app.stage.addChild(this.sprite);
        RockSprite.ROCK_NUM++;

        this._collisionsOff = false;
        this._collisionsOffSkip = 0;
    }

    draw(){

        this.sprite.x += this.directionX * this.speed;
        this.sprite.y += this.directionY * this.speed;
        this.sprite.angle += 2;

        if(!this._collisionsOff){

            let bounds1 = this.sprite.getBounds();
            let bounds2 = this.ship.sprite.getBounds();

            if(bounds1.x < bounds2.x + bounds2.width && bounds1.x + bounds1.width > bounds2.x && bounds1.y < bounds2.y + bounds2.height && bounds1.y + bounds1.height > bounds2.y){

                this.directionX = -this.directionX + this.ship.directionX;
                this.directionY = -this.directionY + this.ship.directionY;

                this.sprite.x += this.directionX * this.speed;
                this.sprite.y += this.directionY * this.speed;
                
                UserInterface.healthMinus();
                this.ship.gotHit();

                this._collisionsOff = true;
            }
        }
        else
            this._collisionsOffSkip++;

        if(this._collisionsOffSkip > 60){
            this._collisionsOff = false;
            this._collisionsOffSkip = 0;
        }

        this.outOfBounds();
    }
}