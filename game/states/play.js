
  'use strict';
  function Play() {}

  var ninja;
  var jumpTimer = 0;
  var cursors;
  var jump;
  var layer;

  Play.prototype = {
    create: function() {


      //gravity
      this.game.physics.arcade.gravity.y = 250;

      //ninja
      ninja = this.game.add.sprite(32, this.game.world.height - 150, 'player');
      this.game.physics.arcade.enable(ninja);

      ninja.body.bounce.y = 0.2;
      ninja.body.gravity.y = 300;
      ninja.body.collideWorldBounds = true;

      ninja.animations.add('left', [4, 5, 6, 7], 16, true);
      ninja.animations.add('right', [8, 9, 10, 11], 16, true);

      this.game.camera.follow(ninja);

      //controls ninja with keyboard
      cursors = this.game.input.keyboard.createCursorKeys();
      jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && ninja.body.touching.down)
    {
        ninja.body.velocity.y = -350;
    }

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  module.exports = Play;