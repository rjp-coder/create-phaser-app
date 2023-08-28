import { getBounds } from "./utils";

export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: "classBasedScene" });
  }

  preload() {
    this.load.image("ball1", "assets/sprites/pangball.png");
  }

  create() {
    const {width, height} =  getBounds(this)
    this.matter.world.setBounds(0, 0, width, height, 32, true, true, false, true);
    for (let i = 0; i < 64; i++) {
      const ball = this.matter.add.image(
        Phaser.Math.Between(32, width),
        Phaser.Math.Between(-600, 0),
        "ball1"
      );
      // the below line should have an error if you have correct type-checking set up. The error should say
      // expected 1-2 arguments but got 0.
      ball.setCircle();
      ball.setFriction(0.005);
      ball.setBounce(1);
    }
  }
}
