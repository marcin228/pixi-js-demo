import Driver from "./Driver.js";

const app = new PIXI.Application( {background: '#000000', resizeTo: window });
document.body.appendChild(app.view);
app.stage.sortableChildren = true;

let driver = new Driver(app);

function mainLoop(){

    driver.loop();    
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
