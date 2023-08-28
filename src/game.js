import Phaser from "phaser";
import classBasedScene from "./classBasedScene"
import functionBasedScene from "./functionBasedScene"
import { THISAINTASCENE, getCentre } from "./utils";

const startScene = {
    preload(){
        if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); //trick vs code Ts-check into typing "this" correctly
        this.load.image('sky', 'assets/backgrounds/space3.png');
    },
    create() {
        if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
        // Defining variables
        this.add.image(400, 300, 'sky');
        var style = { font: "90px Arial", fill: "#ffffff" };
        var x = 32, y = 32;
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var text = this.add.text(getCentre(this).x, y, "Click to start", style);
        text.setOrigin(0.5,0)
        //text.anchor.setTo(0.5, 0.5); 
        this.input.on("pointerdown",()=>{
            let splash = document.getElementById("cordovaSplashScreen");
            splash && splash.remove();
            text.setText("You clicked!")
            this.scene.start("functionBasedScene") ;
    
        })
    }
}

let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 900, //for mobile phones, a 4/9 ratio is quite useful
    physics: {
        default: 'matter',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [startScene,classBasedScene,functionBasedScene]
};

//const game = new Phaser.Game(config);

//export default game;