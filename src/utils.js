/** this is used in combination with an "instanceof" check to trick the ts-check in vs code IDE into 
 *  understanding that the typing of *this* inside the function should always be a Phaser.Scene.
 * 
 * example usage:
 * if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
 */
export const THISAINTASCENE = "function called with a this object that is not an instance of a scene";

/** gets useful properties of the current scene */
export const getBounds = function (sceneObj){
    const width = sceneObj.cameras.main.width;
    const height = sceneObj.cameras.main.height;
    const cx = sceneObj.cameras.main.worldView.x + width / 2;
    const cy = sceneObj.cameras.main.worldView.y + height / 2;
    return {cx,cy,width,height}
}

export const scaleImageToScreen = function (image,scene){
    const {width,height} =  scene.cameras.main;
    let scaleX =  width /gameWidth;
    let scaleY =  height/gameHeight;
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scaleX,scaleY).setScrollFactor(0)
}

export const fitToScreen = function (image,scene){
    const {width,height} =  scene.cameras.main;
    let scaleX = width / image.width;
    let scaleY = height / image.height;
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scaleX,scaleY).setScrollFactor(0)
}

export const displayDebugInfo = function(scene){
    var style = { font: "20pt Arial", fill: "#000000" };
    const {width,height} = getBounds(scene);
    let deviceString = `Device::Height:${Math.round(height)},Width:${Math.round(width)}`;
    let canvasString = `Canvas::Height:${gameHeight},Width:${gameWidth}`;
    let scaleString = `ScaleFactor::Y:${Math.round(height*100/gameHeight)/100},X:${Math.round(width*100/gameWidth)/100}`;
    let text = scene.add.text(32, height*0.9, [deviceString,canvasString,scaleString].join("\n"), style);
    text.setOrigin(0,1);
}

export const showGrid = function(scene){
    const g2 = scene.add.grid(0,0, gameWidth, gameHeight, 32, 64, 0x00b9f2,0.2).setAltFillStyle(0x016fce,0.2).setOutlineStyle(0x00ff00,0.5);
    g2.setOrigin(0,0);
    fitToScreen(g2,scene);
}


export const gameWidth = 320;
export const gameHeight = 568;