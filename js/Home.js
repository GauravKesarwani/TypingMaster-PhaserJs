'use strict';

/**
 * [home description]
 * @param  {[type]} game [description]
 * @return {[type]}      [description]
 */
var home = function (game) { 
  this.game = game;
};

home.prototype = {
  preload: function() {
    this.game.load.image('background', 'assets/images/prep/background.jpg');
  },

  create: function() {
    var playText,
      instructionsText,
      settingsText,
      exitText,
      menuOptions;


    var style = { 
      font: "bold 14px Arial", 
      fill: "#FFF", 
      boundsAlignH: "center",
      boundsAlignV: "center" 
    };

    menuOptions = {
      playGame: 'Play Game',
      gameInstructions: 'Game Instructions',
      gameSettings: 'Game Settings',
      exit: 'Exit Game'
    };
    
    this.game.add.image(0, 0, 'background');

    playText = this.game.add.text(350, 200, menuOptions.playGame, style);
    instructionsText = this.game.add.text(350, 250, menuOptions.gameInstructions, style);
    settingsText = this.game.add.text(350, 300, menuOptions.gameSettings, style);
    exitText = this.game.add.text(350, 350, menuOptions.exit, style);

    // Enables all kinds of input on text
    playText.inputEnabled = true;
    instructionsText.inputEnabled = true;  
    settingsText.inputEnabled = true;  
    exitText.inputEnabled = true; 

    playText.events.onInputDown.add(this.showScreen, this);
    instructionsText.events.onInputDown.add(this.showScreen, this); 
    settingsText.events.onInputDown.add(this.showScreen, this); 
  },

  /**
   * [showScreen description]
   * @param  {object} item [description]
   * @return {[type]}      [description]
   */
  showScreen: function(item) {
    switch (item._text) {
      case 'Play Game':
        this.game.state.start('Play');
        break;
      case 'Game Instructions':
        this.game.state.start('Instructions');
        break;
      case 'Game Settings':
        this.game.state.start('Settings');  
    }
    
  }
};