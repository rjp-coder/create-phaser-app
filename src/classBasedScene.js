export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: "classBasedScene" });
  }

  preload() {
    this.load.image("ball1", "assets/sprites/pangball.png");
  }

  create() {
    this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);

    for (let i = 0; i < 64; i++) {
      const ball = this.matter.add.image(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(-600, 0),
        "ball1"
      );
      ball.setCircle();
      ball.setFriction(0.005);
      ball.setBounce(1);
    }
  }
}
