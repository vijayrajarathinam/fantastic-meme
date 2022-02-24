import React, { Component } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import bitmap from "./bitmap/ground";

// 64 tile size
// 22 tile width
// 11 tile heigth
class App extends Component {
  state = {
    initialize: true,
    player: null,
    cursors: null,
    game: {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: function () {
          this.load.image("background", "assets/BG.png");
          this.load.image("1", "assets/Tiles/1.png");
          this.load.image("2", "assets/Tiles/2.png");
          this.load.image("3", "assets/Tiles/3.png");

          this.load.image("4", "assets/Tiles/4.png");
          this.load.image("5", "assets/Tiles/5.png");
          this.load.image("6", "assets/Tiles/6.png");
          this.load.image("9", "assets/Tiles/9.png");
          this.load.image("10", "assets/Tiles/10.png");
          this.load.image("11", "assets/Tiles/11.png");
          this.load.image("12", "assets/Tiles/12.png");
          this.load.image("13", "assets/Tiles/13.png");
          this.load.image("14", "assets/Tiles/14.png");
          this.load.image("15", "assets/Tiles/15.png");
          this.load.image("17", "assets/Tiles/17.png"); //top_water
          this.load.image("18", "assets/Tiles/18.png"); //water

          this.load.image("sign1", "assets/Object/Sign_2.png"); //start
          this.load.image("sign2", "assets/Object/Sign_1.png"); //finish

          this.load.image("crate", "assets/Object/Crate.png");
          this.load.image("tree1", "assets/Object/Tree_1.png");
          this.load.image("tree2", "assets/Object/Tree_2.png");

          //game character
          this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 46,
          });

          // this.load.spritesheet("dude", "assets/dude3.png", {
          //   frameWidth: 51,
          //   frameHeight: 46,
          // });
        },
        create: function () {
          const bg = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "background");
          let platforms = this.physics.add.staticGroup();
          let platform2 = this.physics.add.staticGroup();
          let surrounding = this.physics.add.staticGroup();
          const _65 = (num) => num * 64;
          const _63 = (num) => num * 63;
          let waterLevel = 645;

          for (let i = 0; i < 24; i++) {
            platforms.create(_63(i), waterLevel, "17").setScale(0.5).refreshBody();
          }

          for (let i = 0; i < 24; i++) {
            platforms
              .create(_63(i), waterLevel + 56, "18")
              .setScale(0.5)
              .refreshBody();
          }

          for (let i = 0; i < 24; i++) {
            platforms
              .create(_63(i), waterLevel + 56 * 2, "18")
              .setScale(0.5)
              .refreshBody();
          }

          bitmap.ground.forEach(function layer(layers, y) {
            const yPoint = _65(y);

            for (let layer in layers) {
              if (layers[layer] != 0)
                platforms
                  .create(_65(layer), yPoint, layers[layer] + "")
                  .setScale(0.5)
                  .refreshBody();
            }
          });

          bitmap.openGround.forEach(function layer(layers, y) {
            const yPoint = _65(y);

            for (let layer in layers) {
              if (layers[layer] != 0)
                platform2
                  .create(_65(layer), yPoint, layers[layer] + "")
                  .setScale(0.5)
                  .refreshBody();
            }
          });

          bitmap.objects.forEach(function layer(layers, y) {
            const yPoint = _65(y);

            for (let layer in layers) {
              if (layers[layer] != 0) surrounding.create(_65(layer), yPoint, layers[layer] + "");
            }
          });

          this.player = this.physics.add.sprite(100, 150, "dude");

          // this.player.setFrame(3);
          this.player.setBounce(0.2);
          this.player.setCollideWorldBounds(true);

          this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
          });

          this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 5 }],
            frameRate: 20,
          });

          this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
          });

          this.physics.add.collider(this.player, platforms);
          this.cursors = this.input.keyboard.createCursorKeys();

          // bg.setScale(1.5).refreshBody();
        },
        update: function () {
          if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play("right", true);
          } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
          }

          if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-350);
          }
        },
      },
    },
  };

  render() {
    const { initialize, game } = this.state;
    return <IonPhaser game={game} initialize={initialize} />;
  }
}

export default App;
