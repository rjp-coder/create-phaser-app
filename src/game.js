import Phaser from "phaser";
import classBasedScene from "./classBasedScene"
import functionBasedScene from "./functionBasedScene"

import "./utils"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [{
        create
    },classBasedScene,functionBasedScene]
};

const game = new Phaser.Game(config);

function create() {
    // Defining variables
    console.log("loaded the first scene first")
    console.log(this.scene);
    window.t=this;
    var style = { font: "30px Arial", fill: "#ffffff" };
    var x = game.canvas.width/2, y = game.canvas.height/2;
    var text = this.add.text(x, y-50, "Click to start", style);
    //text.anchor.setTo(0.5, 0.5); 
    this.input.on("pointerdown",()=>{
        let splash = document.getElementById("cordovaSplashScreen");
        splash && splash.remove();
        text.setText("You clicked!")
        this.scene.start("functionBasedScene") ;

    })
}

export default game;