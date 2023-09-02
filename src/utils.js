import * as dat from 'dat.gui';
import { HealthBar } from './healthbar';
import {guiText as guiStyle} from './textStyles';
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
    let scaleX =  width /canvasWidth;
    let scaleY =  height/canvasHeight;
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
    let canvas = `Height:${canvasHeight},Width:${canvasWidth}`;
    let scale = `Y:${Math.round(height*100/canvasHeight)/100},X:${Math.round(width*100/canvasWidth)/100}`;
    let scaleInfo = {device,canvas,scale}
    Object.keys(scaleInfo).forEach(k=>f1.add(scaleInfo,k));
    // const console = gui.addFolder('Console');
    // console.add(globalThis.log,'0').listen();
    // console.add(globalThis.log,'1').listen();
    // console.add(globalThis.log,'2').listen();
    return gui;
}

export const showGrid = function(scene){
    const g = scene.add.grid(0,0, canvasWidth*3, canvasHeight, 32, 64).setOutlineStyle(0x00ff00,0.5);
    g.setOrigin(0,0);
    g.setDepth(-99)
}

export const showFancyGrid = function(scene){
    const g = scene.add.grid(0,0, canvasWidth*3, canvasHeight, 32, 64,'0xff00cc').setAltFillStyle('0x00ffcc');
    g.setOrigin(0,0);
    g.setDepth(-99)
}

export const makeCameraDraggable = function(scene){
    const cam = scene.cameras.main;
    if (! (cam instanceof Phaser.Cameras.Scene2D.Camera) ) throw THISAINTASCENE;
    cam.dragTime=0;
    scene.input.mousePointer.motionFactor = 0.5;
    scene.input.pointer1.motionFactor = 0.5;
    let gracePeriod = 4; //wait this many frames before allowing drag.
    scene.input.on("pointermove", function (p) {
      if (!p.isDown) return;
      cam.dragTime++;
      if (cam.dragTime > gracePeriod) {
        const { x, y } = p.velocity;
        cam.scrollX -= x / 1;
        cam.scrollY -= y / 1;
      }
    });
    scene.input.on(
      "pointerup",
      function (pointer) {
        console.log(cam.dragTime);
        var touchX = pointer.x;
        var touchY = pointer.y;
        cam.dragTime=0;
      },
      scene
    );
    
}

export const hijackConsole = function(){
    {
        const clog = console.log.bind(console)
        console.log = (...args) => {
          if (!globalThis.log) globalThis.log = [];
          globalThis.log.push(console);
          clog(...args)
        }
      }
}

export const showMockGui = function(scene){
    var guiBox = scene.add.rectangle(0,0,300,80,0x000000,0.5).setScrollFactor(0);
    var text = scene.add.text(0, 16, "HP", guiStyle);
    text.setScrollFactor(0,0);
    scene.hp = new HealthBar(scene, 24, 16);
}


export const canvasWidth = 320;
export const canvasHeight = 576; //this is incredibly close to iphone 568, but is a multiple of 32.