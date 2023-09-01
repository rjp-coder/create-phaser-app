import * as dat from 'dat.gui';
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
    const gui = new dat.GUI();
    const f1 = gui.addFolder('DebugInfo');
    const cam = gui.addFolder('Camera');
    const camera = scene.cameras.main;
    f1.add(cordova,'platformId').listen();
    cam.add(camera, 'x').listen();
    cam.add(camera, 'y').listen();
    cam.add(camera, 'height').listen();
    cam.add(camera, 'width').listen();
    cam.add(camera, 'scrollX').listen();
    cam.add(camera, 'scrollY').listen();
    const {width,height} = getBounds(scene);
    let device = `Height:${Math.round(height)},Width:${Math.round(width)}`;
    let canvas = `Height:${gameHeight},Width:${gameWidth}`;
    let scale = `Y:${Math.round(height*100/gameHeight)/100},X:${Math.round(width*100/gameWidth)/100}`;
    let scaleInfo = {device,canvas,scale}
    Object.keys(scaleInfo).forEach(k=>f1.add(scaleInfo,k));
}

export const showGrid = function(scene){
    const g2 = scene.add.grid(0,0, gameWidth, gameHeight, 32, 64).setOutlineStyle(0x00ff00,0.5);
    g2.setOrigin(0,0);
    fitToScreen(g2,scene);
}


export const gameWidth = 320;
export const gameHeight = 576; //this is incredibly close to iphone 568, but is a multiple of 32.