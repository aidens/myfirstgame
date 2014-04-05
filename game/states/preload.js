
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
