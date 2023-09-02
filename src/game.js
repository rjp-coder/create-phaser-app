import Phaser from "phaser";
import classBasedScene from "./classBasedScene"
import functionBasedScene from "./functionBasedScene"
import { THISAINTASCENE, getBounds, fitToScreen, canvasHeight, canvasWidth, scaleImageToScreen, displayDebugInfo } from "./utils";
import {title as titleStyle} from './textStyles';
const startScene = {
    preload(){
        if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); //trick vs code Ts-check into typing "this" correctly
        this.load.image('sky', 'assets/backgrounds/space3.png');
    },
    create() {
        if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
        // Defining variables
        const bkg = this.add.image(getBounds(this).cx, getBounds(this).cy, 'sky');
        var y = 32;
        var text = this.add.text(getBounds(this).cx, y, "Click to start", titleStyle);
        text.setOrigin(0.5,0);
        let gui = displayDebugInfo(this);
        this.input.on("pointerdown",()=>{
            let splash = document.getElementById("cordovaSplashScreen");
            splash && splash.remove();
            text.setText("You clicked!");
            gui.destroy();
            this.scene.start("functionBasedScene") ;
            
        })
    }
}

let config = {
    type: Phaser.AUTO,
    parent: "canvasWrapper",
    scaleMode: Phaser.Scale.RESIZE,
    width: canvasWidth,
    height: canvasHeight, //for mobile phones, a 4/9 ratio is quite useful
    physics: {
        default: 'matter',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [startScene,classBasedScene,functionBasedScene]
};

const game = new Phaser.Game(config);

export default game;