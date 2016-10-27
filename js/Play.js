var play = function(game) {
	this.game = game;
  this.easyWordTextArray = [ ];
  this.generatedWordsSet = new Set();
}

play.prototype = {
  preload: function() {
    this.game.load.text('easy', 'http://localhost:8080/assets/words/words_easy.txt');
    this.game.load.text('medium', 'http://localhost:8080/assets/words/words_medium.txt');
    this.game.load.text('hard', 'http://localhost:8080/assets/words/words_hard.txt');
  },

  create: function() {
    var easyWords,
      mediumWords,
      hardWords,
      getText; 

    var wordStyle = { 
      font: "bold 12px Arial", 
      fill: "#FF0000", 
      boundsAlignH: "center",
      boundsAlignV: "center", 
    };  

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
      
    easyWords = this.game.cache.getText('easy').split('\n');
    mediumWords = this.game.cache.getText('medium').split('\n');
    hardWords = this.game.cache.getText('hard').split('\n');

    var self = this;
    
    // Create Phaser Text objects
    easyWords.forEach(function(word, index, array) {
      var xPosition = Math.floor(Math.random() * 0.8 * 1000);
      var text = self.game.add.text(xPosition, -20, word, wordStyle);
      self.game.cache.addText(word, text)
      self.easyWordTextArray.push(text);
    });

    //var generateWord = this.generateWord;
    // Enable the Arcade physics system  
    this.game.physics.arcade.enable(this.easyWordTextArray);
    this.game.time.events.repeat(Phaser.Timer.SECOND, 9999, this.generateWord, this);
  },

  generateWord: function() {
    // Get two words at random and move them into the world
    
    var randomWordIndex = Math.floor((Math.random() * 1000));
    var randomWord = this.easyWordTextArray[randomWordIndex];
    generatedWordsSet.add(randomWord);
    randomWord.body.velocity.setTo(0,100);
  }
}