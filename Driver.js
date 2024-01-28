import Controls from './Controls.js';
import RockSprite from './RockSprite.js';
import Ship from './Ship.js';
import Background from './Background.js';
import Settings from './Settings.js';
import UserInterface from './UserInterface.js';
import Levels from './Levels.js';

/**
 * Main game controlling class. Keeps all the games' objects and manages main game loop.
 */
export default class Driver{

    static GAME_PAUSED = true;

    constructor(app){

        this.app = app;
        this.objects = [];
        this.background = new Background(this.app);
        this.ship = new Ship(this.app, this.objects);
        this.objects[0] = this.ship;
        this.controls = new Controls([this.ship]);
        this.userInterface = new UserInterface(this.app, this);
        this.frame = 0;
    }

    reset(){

        Driver.GAME_PAUSED = true;

        while(this.objects.length > 1)
            this.objects[1].delete();

        this.ship.reset();

        UserInterface.HEALTH = 100;
        UserInterface.SCORE = 0;

        RockSprite.ROCK_NUM = 0;

        Levels.LEVEL = 1;
        
        Settings.ROCK_SPEED_LIMIT = 4;
        Settings.ROCK_FPS_SKIP = 25;
        Settings.ROCK_NUM_LIMIT = 10;
        Settings.FIRE_FPS_SKIP = 30;

        this.frame = 0;
    }
    
    loop(){

        if(!Driver.GAME_PAUSED){
            if(this.frame >= Settings.ROCK_FPS_SKIP){
                if(RockSprite.ROCK_NUM < Settings.ROCK_NUM_LIMIT)
                    if(this.objects.length < Settings.OBJECT_TOTAL_LIMIT)
                        this.objects.push(new RockSprite(this.app, this.objects));
                this.frame = 0;
            }
            else
                this.frame++;
            
            this.controls.command();
            
            for(let key in this.objects)
                this.objects[key].draw();
        }

        this.userInterface.draw();
    }
}