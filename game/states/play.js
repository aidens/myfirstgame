  'use strict';
  function Play() {}

  var ninja;
  var enemies;
  var jumpTimer = 0;
  var cursors;
  var jump;
  var bg;
  var platforms;

  Play.prototype = {
    createEnemies: function() {

    for (var y = 0; y < 4; y++)
    {
      for (var x = 0; x < 10; x++)
      {
        var enemies = enemies.create(x * 48, y * 50, 'enemy');
        enemies.anchor.setTo(0.5, 0.5);;
        enemies.animations.add('walk');
        enemies.animations.play('walk', 15, true);
      }
    }

    enemies.x = 100;
    enemies.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(enemies).to( { x: 200 }, 200, Phaser.Easing.Linear.None, true, 0, 100, true);

    //  When the tween completes it calls descend, before looping again
    tween.onComplete.add(descend, this);
}

      //enemies
      enemies = this.game.add.sprite(400, this.game.world.height - 160, 'enemy');
      this.game.physics.arcade.enable(enemies);

      enemies.body.bounce.y = 0.2;
      enemies.body.gravity.y = 300;
      enemies.body.collideWorldBounds = true;

    },
    create: function() {

      //start Physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //background 
      bg = this.game.add.tileSprite(0, 0, 800, 600, 'bg');

      //platforms
      platforms = this.game.add.group();
      platforms.enableBody = true;
 
      // Here we create the ground.
      var ground = platforms.create(200, this.game.world.height - 100, 'ground');

      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(1,1);
 
      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      //ninja
      ninja = this.game.add.sprite(32, this.game.world.height - 160, 'player');
      this.game.physics.arcade.enable(ninja);

      ninja.body.bounce.y = 0.2;
      ninja.body.gravity.y = 300;
      ninja.body.collideWorldBounds = true;

      ninja.animations.add('left', [4, 5, 6, 7], 16, true);
      ninja.animations.add('right', [8, 9, 10, 11], 16, true);

      this.game.camera.follow(ninja);

      createEnemies();

      //controls ninja with keyboard
      cursors = this.game.input.keyboard.createCursorKeys();
      jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },


    update: function() {

      ninja.body.velocity.x = 0;
      bg.tilePosition.x += 2;

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
    if (jump.isDown && ninja.body.touching.down)
    {
        ninja.body.velocity.y = -250;
    }

     //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(ninja, platforms);
    this.game.physics.arcade.collide(enemies, platforms);
    this.game.physics.arcade.collide(ninja, enemies);

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  module.exports = Play;