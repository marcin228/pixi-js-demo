import InteractiveSprite from './InteractiveSprite.js';
import RockSprite from './RockSprite.js';
import Settings from './Settings.js';
import UserInterface from './UserInterface.js';

/**
 * Ammo sprite + draw method with collision detection and logic handle
 * @extends InteractiveSprite
 */
export default class AmmoSprite extends InteractiveSprite{

    constructor(app, objects){
        super(app, objects);

        this.ship = this.objects[0];
        this.totalLife = 88;
        this.currentLife = this.totalLife;
        this.type = 'ammo';

        let tmp = this.ship .getDirections();
        this.directionX = tmp[0] + ((Math.random()-0.5) * Settings.FIRE_SPRAY_FACTOR);
        this.directionY = tmp[1] + ((Math.random()-0.5) * Settings.FIRE_SPRAY_FACTOR);

        this.sprite = PIXI.Sprite.from(Settings.SPRITE_AMMO);
        this.sprite.anchor.set(0.5);
        this.sprite.x = this.ship.sprite.x;
        this.sprite.y = this.ship.sprite.y;
        this.sprite.zIndex = 1;
        this.app.stage.addChild(this.sprite);
    }

    draw(){

        this.sprite.x += this.directionX * Settings.SHIP_SPEED_LIMIT * 2;
        this.sprite.y += this.directionY * Settings.SHIP_SPEED_LIMIT * 2;
        
        for(let i = 1; i < this.objects.length; i++){

            if(this.type != this.objects[i].type){
        
                let bounds1 = this.sprite.getBounds();
                let bounds2 = this.objects[i].sprite.getBounds();

                if(bounds1.x < bounds2.x + bounds2.width && bounds1.x + bounds1.width > bounds2.x && bounds1.y < bounds2.y + bounds2.height && bounds1.y + bounds1.height > bounds2.y){
                    
                    // @todo change from direct incrementation to update with a parameter from {@link Settings.js}
                    UserInterface.SCORE++;
                    RockSprite.ROCK_NUM--;

                    this.objects[i].delete();
                    this.delete();

                    return;
                }
            }
        }

        this.currentLife--;
        this.sprite.alpha = (this.currentLife / this.totalLife);
        if(this.currentLife < 0) 
            this.delete();
        this.outOfBounds();
    }
}