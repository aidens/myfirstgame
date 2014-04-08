  'use strict';
  function Play() {}

  var ninja;
  var cursors;
  var bg;
  var platforms;
  var ground;

  Play.prototype = {
  create: function() {
 //background
      bg = this.game.add.tileSprite(0, 0, 800, 600, 'bg');

      //start Physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      platforms = this.game.add.group();
      platforms.enableBody = true;
      var ground = platforms.create(0, this.game.world.height - 100, 'ground');
      var ground2 = platforms.create(128, this.game.world.height - 100, 'ground2');
      ground.body.immovable = true;
      ground2.body.immovable = true;

      var ledge = platforms.create(350, 300, 'ledge');
      var ledge2 = platforms.create(450, 300, 'ledge2');
      var ledge3 = platforms.create(700, 150, 'ledge');


      ledge.body.immovable = true;
      ledge2.body.immovable = true;
      ledge3.body.immovable = true;

      //ninja
      ninja = this.game.add.sprite(32, 48,'player');
      this.game.physics.arcade.enable(ninja);

      ninja.body.bounce.y = 0.2;
      ninja.body.gravity.y = 600;
      ninja.body.collideWorldBounds = true;

      ninja.animations.add('left', [4, 5, 6, 7], 16, true);
      ninja.animations.add('right', [8, 9, 10, 11], 16, true);

    //  createEnemies();

      //controls ninja with keyboard
      cursors = this.game.input.keyboard.createCursorKeys();

    },


    update: function() {

    ninja.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        ninja.body.velocity.x = -150;
        ninja.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        ninja.body.velocity.x = 150;
        ninja.animations.play('right');
    }
    else
    {
        //  Stand still
        ninja.animations.stop();
        ninja.frame = 1;
    }
    //  Allow the ninja to jump if they are touching the ground.
    if (cursors.up.isDown)
    {
        ninja.body.velocity.y = -250;
    }

     //  Collide the player and the stars with the platforms
     this.game.physics.arcade.collide(ninja, platforms);
     this.game.physics.arcade.collide(ninja, ground);
    // this.game.physics.arcade.collide(ninja, enemies);

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  module.exports = Play;