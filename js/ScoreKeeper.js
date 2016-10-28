var ScoreKeeper = function (game) {
  this.game = game;
  this.gameScore = 0;
}

ScoreKeeper.prototype = {
  update: function () {
    this.gameScore++;
  },

  getScore: function () {
    return this.gameScore;
  }
}