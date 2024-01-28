import InteractiveSprite from "./InteractiveSprite.js";
import AmmoSprite from "./AmmoSprite.js";
import Settings from "./Settings.js";
import UserInterface from "./UserInterface.js";

export default class Ship extends InteractiveSprite{

    constructor(app, objects){

        super(app, objects);

        this._directionX = 0;
        this._directionY = -0.001;
        this._hitTimeout = undefined;
        this._hitTimeout = undefined;
        this._fireLimiter = 0;

        this._shield = new PIXI.Graphics();
        this._shield.beginFill(0x0debc3).drawCircle(0, 0, 120).endFill();
        this._shield.blendMode = PIXI.BLEND_MODES.SCREEN;
        const blurFilter = new PIXI.BlurFilter(8);
        this._shield.filters = [blurFilter];
        this._shield.alpha = 0;

        this.sprite = PIXI.Sprite.from(Settings.SPRITE_SHIP);
        this.sprite.anchor.set(0.5);
        this.sprite.x = this.app.screen.width / 2;
        this.sprite.y = this.app.screen.height / 2;
        this.sprite.zIndex = 2;
        this.app.stage.addChild(this.sprite);
        this.sprite.addChild(this._shield);

        this.lastX = this.sprite.x;
        this.lastY = this.sprite.y;

        this.brake = setInterval(() => {
            this._directionX /= (1 + Settings.SHIP_SLIDE_FACTOR);
            this._directionY /= (1 + Settings.SHIP_SLIDE_FACTOR);
        }, 20);
    }

    get directionX(){
        return this._directionX;
    }

    set directionX(val){
        this._directionX = val;
    }

    get directionY(){
        return this._directionY;
    }

    set directionY(val){
        this._directionY = val;
    }

    draw(){

        this.sprite.x += this.directionX * Settings.SHIP_SPEED_LIMIT;
        this.sprite.y += this.directionY * Settings.SHIP_SPEED_LIMIT;

        if(this.sprite.x > this.app.screen.width)
            this.sprite.x = 0;
        if(this.sprite.x < 0)
            this.sprite.x = this.app.screen.width;

        if(this.sprite.y > this.app.screen.height)
            this.sprite.y = 0;
        if(this.sprite.y < 0)
            this.sprite.y = this.app.screen.height;

        //if(this.lastX != this.sprite.x || this.lastY != this.sprite.y)
        //    this.sprite.angle = -90 + Math.atan2(this.lastY - this.sprite.y, this.lastX - this.sprite.x) * (180 / Math.PI);

        this.lastX = this.sprite.x;
        this.lastY = this.sprite.y;
    }

    control(key){

        if(key == 'ArrowUp'){

            let directions = this.getDirections();

            this.directionX += (directions[0] < this.directionX) ? -Settings.SHIP_SLIDE_FACTOR : Settings.SHIP_SLIDE_FACTOR;
            this.directionY += (directions[1] < this.directionY) ? -Settings.SHIP_SLIDE_FACTOR : Settings.SHIP_SLIDE_FACTOR;
        }

        if(key == 'ArrowDown'){
            this._directionX /= (1 + (Settings.SHIP_SLIDE_FACTOR * 1.5));
            this._directionY /= (1 + (Settings.SHIP_SLIDE_FACTOR * 1.5));
        }

        if(key == 'ArrowLeft'){
            this.sprite.angle -= 4;
            if(this.sprite.angle < 0){
                this.sprite.angle %= 360; 
                this.sprite.angle += 360; 
            }
        }
        
        if(key == 'ArrowRight'){
            this.sprite.angle+=4;
            this.sprite.angle %= 360;
        }

        if(key == ' '){
            if(this._fireLimiter == 0)
                this.objects.push(new AmmoSprite(this.app, this.objects));
            
            this._fireLimiter++;

            if(this._fireLimiter >= Settings.FIRE_FPS_SKIP)
                this._fireLimiter = 0;
        }
    }

    gotHit(){

        if(this._hitTimeout != undefined)
            clearTimeout(this._hitTimeout);

        if(this._hitTimeout != undefined)
            clearTimeout(this._hitTimeout);

        this._shield.alpha = UserInterface.HEALTH/100;

        this._shield.scale.x = 1;
        this._shield.scale.y = 1;
 
        this._hitTimeout = setTimeout(() => {
            this._shield.scale.x = 0.75;
            this._shield.scale.y = 0.75;
        }, 25);

        this._hitTimeout = setTimeout(() => {
            this._shield.alpha = 0;
        }, 50);
    }

    /**
    * An array of constant length of 3. 0: xspeed. 1: yspeed. 2:quarter <1-4>
    * @returns {Array.<(number)>} An array of constant length of 3.
    */
    getDirections(){

        let direction = [0,0,0];

        if(this.sprite.angle >= 0 && this.sprite.angle <= 90){
            let ratio = this.sprite.angle / 90;
            direction[0] = ratio;
            direction[1] = -(1 - ratio);
            direction[2] = 1;
        }

        if(this.sprite.angle > 90 && this.sprite.angle <= 180){
            let ratio = (this.sprite.angle-90)/90;
            direction[0] = (1 - ratio);
            direction[1] = ratio;
            direction[2] = 2;
        }

        if(this.sprite.angle > 180 && this.sprite.angle <= 270){
            let ratio = (this.sprite.angle-180)/90;
            direction[0] = -ratio;
            direction[1] = (1 - ratio);
            direction[2] = 3;
        }

        if(this.sprite.angle > 270 && this.sprite.angle <= 359){
            let ratio = (this.sprite.angle-270)/90;
            direction[0] = -(1 - ratio);
            direction[1] = -ratio;
            direction[2] = 4;
        }

        return direction;
    }

    reset(){
        this._directionX = 0;
        this._directionY = -0.001;
        this._hitTimeout = 0;
        this._hitTimeout = 0;
        this._fireLimiter = 0;
        this.sprite.x = this.app.screen.width / 2;
        this.sprite.y = this.app.screen.height / 2;
        this.sprite.angle = 0;
    }
}