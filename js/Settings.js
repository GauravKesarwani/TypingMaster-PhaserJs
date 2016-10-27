'use strict';

/**
 * [settings description]
 * @param  {[type]} game [description]
 * @return {[type]}      [description]
 */
var settings = function(game) {
  console.log('Settings Page...')
}

settings.prototype = {
  preload: function() {
    this.game.load.image('button-easy', '../assets/images/prep/easy.png');
    this.game.load.image('button-medium', '../assets/images/prep/medium.png');
    this.game.load.image('button-hard', '../assets/images/prep/hard.png');
  },

  create: function() {
    var buttonX = 350;

    var mainMenu = 'Go To Main Menu';
    
    var difficultyLevels = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    };

    var mainMenuStyle = { 
      font: "bold 14px Arial", 
      fill: "#FF0000", 
      boundsAlignH: "center",
      boundsAlignV: "center" 
    };

    this.game.add.button(buttonX, 200, 'button-easy', this.selectLevel, this);
    this.game.add.button(buttonX, 300, 'button-medium', this.selectLevel, this);
    this.game.add.button(buttonX, 400, 'button-hard', this.selectLevel, this);

    var mainMenuText = this.game.add.text(350, 500, mainMenu, mainMenuStyle);

    mainMenuText.inputEnabled = true;

    mainMenuText.events.onInputDown.add(this.showHomeScreen, this);
  },

  selectLevel: function() {
    console.log('Level Selected');
  },

  showHomeScreen: function() {
    this.game.state.start('Home');
  }
}