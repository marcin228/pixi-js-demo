import Settings from "./Settings.js";
import UserInterface from "./UserInterface.js";

export default class Levels{

    static LEVEL = 1;
    static _FINAL_FIGHT = 0;

    static checkScoreState(){

        if((Levels.LEVEL * 5) - UserInterface.SCORE <= 0)
            Levels.levelUp();

        if(UserInterface.SCORE > 5)
            Settings.FIRE_FPS_SKIP = 0;
    }

    static levelUp(){

        if(Levels.LEVEL % 5 == 0){
            Levels._FINAL_FIGHT = 0;

            Settings.ROCK_NUM_LIMIT = Settings.ROCK_NUM_LIMIT_LAST_LEVEL;
            Settings.ROCK_FPS_SKIP = 2;
        }

        if(Levels._FINAL_FIGHT == 5){
            Settings.ROCK_SPEED_LIMIT += 1;
            Settings.ROCK_FPS_SKIP = 25;
            Settings.ROCK_NUM_LIMIT = 1;
            Levels._FINAL_FIGHT = undefined;
        }

        if(Settings.ROCK_FPS_SKIP >= 2)
            Settings.ROCK_FPS_SKIP -= 2;

        if(Settings.ROCK_NUM_LIMIT < Settings.ROCK_NUM_LIMIT_LAST_LEVEL)
            Settings.ROCK_NUM_LIMIT += 2;

        Levels.LEVEL += 1;

        if(Levels._FINAL_FIGHT !== undefined)
            Levels._FINAL_FIGHT++;
    }
}