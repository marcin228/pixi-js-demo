export default class InteractiveSprite{

    constructor(app, objects, sprite = null){
        this.app = app;
        this.objects = objects;
        this.sprite = sprite;
    }

    outOfBounds(){
        if(this.sprite)
        {
            if(this.sprite.x < 0)
                this.sprite.x = this.app.screen.width;
            if(this.sprite.x > this.app.screen.width)
                this.sprite.x = 0;

            if(this.sprite.y < 0)
                this.sprite.y = this.app.screen.height;
            if(this.sprite.y > this.app.screen.height)
                this.sprite.y = 0;

            /*
            if(this.sprite.x < 0 || this.sprite.x > this.app.screen.width || this.sprite.y < 0 || this.sprite.y > this.app.screen.height){
                this.delete();
            }
            */
        }
    }

    delete(){    
        this.app.stage.removeChild(this.sprite);
        this.objects.splice(this.objects.indexOf(this), 1);
    }

    draw(){}
    control(){}
}