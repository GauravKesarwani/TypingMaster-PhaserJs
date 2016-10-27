var instructions = function(game) {
  console.log('Typing Master... Instructions Screen');  
};

instructions.prototype = {
  create: function() {
    var instructionsStyle = { 
      font: "bold 14px Arial", 
      fill: "#FFF", 
      boundsAlignH: "center",
      boundsAlignV: "center",
      wordWrap: "true",
      wordWrapWidth: 300 
    };

    var instructionsText = 'This is a Typing tutor game where player needs to type the words to ' + 
      'destroy them and if he misses 3 words then game is over.',
      mainMenuText = 'Home';

    var mainMenuStyle = { 
      font: "bold 14px Arial", 
      fill: "#FF0000", 
      boundsAlignH: "center",
      boundsAlignV: "center", 
    };

    this.game.add.text(250, 200, instructionsText, instructionsStyle);  
    var mainMenuBtn = this.game.add.text(350, 400, mainMenuText, mainMenuStyle); 

    mainMenuBtn.inputEnabled = true;
    mainMenuBtn.events.onInputDown.add(this.showMainMenu, this);
  },

  showMainMenu: function() {
    this.game.state.start('Home');
  }
}