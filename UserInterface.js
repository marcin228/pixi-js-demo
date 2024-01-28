import Driver from "./Driver.js";
import Levels from "./Levels.js";
import Settings from "./Settings.js";

export default class UserInterface{

    static SCORE = 0;
    static HEALTH = 100;
        
    constructor(app, driver){
        
        this.app = app;
        this._driver = driver;

        this.bar = new PIXI.Graphics();
        this.bar.beginFill(0x0debc3).drawRect(0,0, this.app.screen.width, 16).endFill();
        this.bar.zIndex = 100;
        this.bar.y = 50;
        this.app.stage.addChild(this.bar);

        let style = new PIXI.TextStyle({ fontFamily: ['Helvetica', 'Arial', 'sans-serif'], align: 'left', fontWeight: "bold", fill: 0x000000, fontSize: 12 });
        this.barLabel = new PIXI.Text('health', style);
        this.barLabel.x = 16;
        this.barLabel.y = this.app.screen.height - 18;
        this.barLabel.zIndex = 101;
        this.app.stage.addChild(this.barLabel);

        style = new PIXI.TextStyle({ fontFamily: ['Helvetica', 'Arial', 'sans-serif'], align: 'left', fontWeight: "bold", fill: 0xFFFFFF, fontSize: 24 });
        this.scoreboard = new PIXI.Text('000000', style);
        this.scoreboard.x = 16;
        this.scoreboard.y = this.app.screen.height - 58;
        this.scoreboard.zIndex = 101;
        this.app.stage.addChild(this.scoreboard);
        
        this.retry = new PIXI.Graphics();
        this.retry.beginFill(0x0debc3).drawRect(0,0, this.app.screen.width, this.app.screen.height).endFill();
        this.retry.zIndex = 105;
        this.app.stage.addChild(this.retry);

        style = new PIXI.TextStyle({ fontFamily: ['Helvetica', 'Arial', 'sans-serif'], align: 'center', fontSize: 14 , fontWeight: 900});
        this.welcomeMessage = new PIXI.Text('JS + pixi.js\r\n\r\nuse keyboard arrow keys to control movement and spacebar to fire\r\npreferably reach 50+ pts\r\n\r\n[ click left mouse button to play ]', style);
        this.welcomeMessage.anchor.set(0.5);
        this.welcomeMessage.x = (this.retry.width / 2);
        this.welcomeMessage.y = (this.retry.height / 2);
        this.retry.addChild(this.welcomeMessage);

        this.retryAnimation = undefined;
        this.retry.eventMode = 'static';
        this.retry.on('click', () => { this.retryClose.apply(this); });
    }

    retryClose(){

        clearInterval(this.retryAnimation);
        this.retryAnimation = setInterval(() => {
                
                if(this.retry.height > 1)
                    this.retry.height = this.retry.height / 2;
                else{

                    Driver.GAME_PAUSED = false;
                    this.retry.height = 0;
                    clearInterval(this.retryAnimation);
                }

                this.retry.y = this.app.screen.height - this.retry.height;

        }, 24);
    }

    retryOpen(){

        this.retry.height = 1;
        
        clearInterval(this.retryAnimation);
        this.retryAnimation = setInterval(() => {
            
            if(this.retry.height < this.app.screen.height)
                this.retry.height = this.retry.height * 2;
            else{

                let tmp = '' + UserInterface.SCORE;
                while(tmp.length < 6) tmp = '0' + tmp;
                this.welcomeMessage.text = 'hi-score\r\n' + tmp + '\r\n\r\n[ click left mouse button to play ]\r\n\r\n';
                this._driver.reset();
                this.retry.height = this.app.screen.height;
                clearInterval(this.retryAnimation);
            }

            this.retry.y = this.app.screen.height - this.retry.height;
        }, 24);
    }

    static healthMinus(){
        UserInterface.HEALTH -= Settings.HEALTH_ROCK_HIT_COST;
    }

    draw(){

        this.bar.width = this.app.screen.width * (UserInterface.HEALTH / 100);
        
        if(UserInterface.HEALTH <= 0 && !Driver.GAME_PAUSED){
            Driver.GAME_PAUSED = true;
            this.retryOpen();
        }

        Levels.checkScoreState();

        let tmp = '' + UserInterface.SCORE;

        while(tmp.length < 6) tmp = '0' + tmp;
        this.scoreboard.text = tmp; // + '/' + Levels.LEVEL;

        if(this.scoreboard.y != this.app.screen.height - 58)
            this.scoreboard.y = this.app.screen.height - 58;
        
        if(this.bar.y != this.app.screen.height-16)
            this.bar.y = this.app.screen.height-16;

        if(this.barLabel.y != this.app.screen.height-18)
            this.barLabel.y = this.app.screen.height - 18;
    }
}