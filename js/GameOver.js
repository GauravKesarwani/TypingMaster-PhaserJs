var GameOver = function (game) {
  this.game = game;
}

GameOver.prototype = {
  create: function () {
    var gameOverStyle = {
      font: '65px Arial',
      fill: '#ff0044',
      align: 'center'
    }

    var text = this.game.add.text(this.game.world.centerX - 40, this.game.world.centerY, 'Game Over', gameOverStyle);
  }
 }