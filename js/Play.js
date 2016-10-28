var play = function (game) {
	this.game = game;
  this.easyWords = [ ];
  this.mediumWords = [ ];
  this.harWords = [ ];
  this.generatedWordsSet = new Set();
  this.generatedWordsMap = new Map();
  this.currentWordList = new Phaser.LinkedList();
  this.gameScore = 0;
  this.scoreKeeper = new ScoreKeeper();
  this.scoreText = '';
  this.playerLives = 3;
}

play.prototype = {
  preload: function () {
    this.game.load.text('easy', 'http://localhost:8080/assets/words/words_easy.txt');
    this.game.load.text('medium', 'http://localhost:8080/assets/words/words_medium.txt');
    this.game.load.text('hard', 'http://localhost:8080/assets/words/words_hard.txt');
  },

  create: function () {
    var getText; 

    var scoreStyle = { 
      font: "bold 14px Arial", 
      fill: "#FF0000", 
      boundsAlignH: "center",
      boundsAlignV: "center", 
    };    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
      
    easyWords = this.game.cache.getText('easy').split('\n');
    mediumWords = this.game.cache.getText('medium').split('\n');
    hardWords = this.game.cache.getText('hard').split('\n');
    
    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 9999, this.generateWord, this);

    this.scoreText = this.game.add.text(20, 490, 'Your Score ' + this.scoreKeeper.getScore(), scoreStyle);
    this.currentWordText = this.game.add.text(20, 520, 'Current Word: ', scoreStyle);
    this.livesLeftText = this.game.add.text(20, 550, 'Lives Left: ' + this.playerLives, scoreStyle )
    // add the callback for key press event
    this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress)
  },

  generateWord: function () {
    var wordStyle = { 
      font: "bold 12px Arial", 
      fill: "#FF0000", 
      boundsAlignH: "center",
      boundsAlignV: "center", 
    };

  
    // Get one words at random and add them into the world
    
    var randomWordIndex = Math.floor((Math.random() * 1000));
    var randomWord = easyWords[randomWordIndex];

    var xPosition = Math.floor(Math.random() * 0.8 * 1000);
    var text = this.game.add.text(xPosition, -20, randomWord, wordStyle);
    this.game.physics.arcade.enable(text);
    this.generatedWordsMap.set(randomWord, text);
    this.generatedWordsSet.add(randomWord);
    text.body.velocity.setTo(0,100);

    text.checkWorldBounds = true;
    // Attach a onDestroy Event Handler to the text
    text.events.onDestroy.add(this.notifyScoreKeeper, this);
    text.events.onDestroy.add(this.displayScore, this);
    text.events.onOutOfBounds.add(this.updateLife, this);
  },

  keyPress: function (char) {
    console.log(char);
    this.currentWordList.add(this.createNode(char));
    this.displayCurrentWord();
    this.checkMatch();
  },

  createNode (char) {
    var node = {};
    node.data = char;
    node.next = null;
    return node;
  },

  checkMatch: function () {
    var currentWord = this.getCurrentWord();
    if (this.generatedWordsSet.has(currentWord)) {
      console.log('Set contains the word');
      this.removeText(currentWord);
    }
    return;
  },

  getCurrentWord: function () {
    console.log(this.currentWordList.total);
    if (!this.currentWordList.total) {
      return;
    } 
    else {
      var i = 0, 
        current = this.currentWordList.first,
        result = '';
      while(i < this.currentWordList.total) {
        result = result + current.data;
        current = current.next;
        i++;
      }
      return result;
    }
  },

  removeText: function (word) {
    console.log('Remove word ', word);
    this.generatedWordsMap.get(word).destroy();
    this.currentWordList.reset();
  },

  notifyScoreKeeper: function () {
    this.scoreKeeper.update();
  },

  displayScore: function (item) {
    this.scoreText.text = 'Your Score ' + this.scoreKeeper.getScore();
  },

  displayCurrentWord: function () {
    this.currentWordText.text = 'Current Word :' + this.getCurrentWord();
  },

  updateLife: function () {
    this.playerLives--;
    this.livesLeftText.text = 'Lives Left :' + this.playerLives;
    
    if (this.playerLives === 0) {
      this.game.state.start('GameOver');
    }
  }
}