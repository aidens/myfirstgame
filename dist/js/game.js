(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ninjae');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 220, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 250, 'ninjae');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 340, 'Click To play', { font: '20px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){
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

      //enemies
      enemies = this.game.add.sprite(400, this.game.world.height - 160, 'enemy');
      this.game.physics.arcade.enable(enemies);

      enemies.body.bounce.y = 0.2;
      enemies.body.gravity.y = 300;
      enemies.body.collideWorldBounds = true;

      enemies.animations.add('left', [4, 5, 6, 7], 16, true);
      enemies.animations.add('right', [8, 9, 10, 11], 16, true);

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
    
    //  Allow the ninja to jump if they are touching the ground.
    if (jump.isDown && ninja.body.onFloor() && this.game.time.now > jumpTimer)
    {
        ninja.body.velocity.y = -250;
    }

    if (cursors.up.isDown || jump.isDown && ninja.body.touching.down)
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
},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('ninjae', 'assets/gametitle.png');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('ledge', 'assets/Walkways/Walkway 1 E.png');
    this.load.image('ground', 'assets/Walls/Wall 2 NW.png');
    this.load.spritesheet('player', 'assets/player.png', 32, 48);
    this.load.spritesheet('enemy', 'assets/redenemy.png', 32, 48);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])