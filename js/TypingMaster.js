(function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'typing-master');

  game.state.add('Boot', boot);
  game.state.add('Home', home);

  game.state.add('Play', play);
  game.state.add('Instructions', instructions);
  game.state.add('Settings', settings);
  game.state.add('ScoreKeeper', ScoreKeeper);
  game.state.add('GameOver',  GameOver);
  //game.state.add('Exit', Exit);

  game.state.start('Boot');

})();