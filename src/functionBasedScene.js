import {THISAINTASCENE, displayDebugInfo, fitToScreen, gameHeight, gameWidth, getBounds, scaleImageToScreen, showGrid, stretchImage, stretchImageToGame} from './utils'

const scene5Props = {
  preload() {
    if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
    console.log(this);
    this.load.image("ball1", "assets/sprites/pangball.png");
  },

  create() {
    //this tricks the ts-check on vs-code into appying correct typing within this function.
    if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE);
    const {width, height} =  getBounds(this);
    this.matter.world.setBounds(0, 0, width, height, 32, true, true, false, true);
    for (let i = 0; i < 64; i++) {
      const ball = this.matter.add.image(
        Phaser.Math.Between(32, width),
        Phaser.Math.Between(-600, 0),
        "ball1"
      );
      scaleImageToScreen(ball,this);
      showGrid(this);
      displayDebugInfo(this);
      // the below line should have an error if you have correct type-checking set up. The error should say
      // expected 1-2 arguments but got 0.
      ball.setCircle();
      ball.setFriction(0.005);
      ball.setBounce(1);
    }
  },
};

const Scene5 = new Phaser.Scene({ key: "functionBasedScene" });
Object.assign(Scene5, scene5Props);

export default Scene5;
