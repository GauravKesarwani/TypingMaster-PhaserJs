// Create a custom word particle

EasyParticle = function (game, x, y, text) {
  var particleText = new Phaser.Text(game, x, y, text);
  Phaser.Particle.call(this, game, x, y, particleText);
}

EasyParticle.prototype = Object.create(Phaser.Particle.prototype);
EasyParticle.prototype.constructor = EasyParticle;
