/**
 * Mimicing the behaviour of an abstract class without it being supported natively.
 * OutOfBounds and delete methods are already implemented. Classes that extend this class have to implement draw and control method.
 */
export default class InteractiveSprite{

    constructor(app, objects, sprite = null){
        this.app = app;
        this.objects = objects;
        this.sprite = sprite;

        if(this.constructor == InteractiveSprite)
            throw new Error('do not use this class directly')
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
            // when objects have to disappear rather then continously fly in and out of screen
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

    draw(){
        throw new Error('draw method is not implemented')
    }

    control(){
        throw new Error('control method is not implemented')
    }
}