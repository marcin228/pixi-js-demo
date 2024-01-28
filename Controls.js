export default class Controls{

    constructor(controlled){

        this.controlled = controlled;
        this.controlsState = {};

        window.addEventListener('keydown', (e) => {
            this.controlsState[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.controlsState[e.key] = false;
        });
    }

    command(){

        /*
        if(this.controlsState['ArrowUp'])
            this.controlled.speedY--;
        if(this.controlsState['ArrowDown'])
            this.controlled.speedY++;
        if(this.controlsState['ArrowLeft'])
            this.controlled.speedX--;
        if(this.controlsState['ArrowRight'])
            this.controlled.speedX++;
        */

        for(let keyId in this.controlsState)
            if(this.controlsState[keyId])
                for(let id in this.controlled)
                    this.controlled[id].control(keyId);
    }
}