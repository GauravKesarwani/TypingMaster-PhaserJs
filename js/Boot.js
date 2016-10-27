'use strict';

var boot = function(game) {
  this.game = game;
};

boot.prototype = {
  preload: function() {
   
  },

  create: function() {
    this.game.state.start('Home');
  }
}