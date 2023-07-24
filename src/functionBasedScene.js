import {THISAINTASCENE} from './utils'

const scene5Props = {
  preload() {
    if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
    console.log(this);
    this.load.image("ball1", "assets/sprites/pangball.png");
  },

  create() {
    if (!(this instanceof Phaser.Scene)) throw (THISAINTASCENE); 
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
  },
};

const Scene5 = new Phaser.Scene({ key: "functionBasedScene" });
Object.assign(Scene5, scene5Props);

export default Scene5;
