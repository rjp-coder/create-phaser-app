import {
  THISAINTASCENE,
  displayDebugInfo,

  canvasHeight,
  canvasWidth,
  getBounds,

  showFancyGrid,

  makeCameraDraggable,
  showMockGui,
} from "./utils";

const scene5Props = {
  preload() {
    if (!(this instanceof Phaser.Scene)) throw THISAINTASCENE;
    console.log(this);
    this.load.image("ball1", "assets/sprites/pangball.png");
  },

  create() {
    //this tricks the ts-check on vs-code into appying correct typing within this function.
    if (!(this instanceof Phaser.Scene)) throw THISAINTASCENE;
    let left = 0,
      top = 0,
      right = canvasWidth * 3,
      bottom = canvasHeight;
    this.cameras.main.setBounds(left, top - 200, right, bottom + 400); //this allows 200px of 'dead' space
    const { cy } = getBounds(this);
    this.cameras.main.centerOn(0, cy);
    this.matter.world.setBounds(
      left,
      top,
      right,
      bottom,
      96,
      true,
      true,
      false,
      true
    );
    for (let i = 0; i < 128; i++) {
      const ball = this.matter.add.image(
        Phaser.Math.Between(32, canvasWidth * 3 - 32),
        Phaser.Math.Between(-600, 0),
        "ball1"
      );
      ball.setTint(Phaser.Math.Between(0, 16777215));
      // the below line should have an error if you have correct type-checking set up. The error should say
      // expected 1-2 arguments but got 0.
      ball.setCircle();
      ball.setFriction(0.005);
      ball.setBounce(1);
    }
    showFancyGrid(this);
    makeCameraDraggable(this);
    displayDebugInfo(this);
    showMockGui(this);
  },
};

const Scene5 = new Phaser.Scene({ key: "functionBasedScene" });
Object.assign(Scene5, scene5Props);

export default Scene5;
