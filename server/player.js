var Player = function() {
  function Player(id, name) {
    this.id          = id;
    this.name        = name;
    this.territories = [];
    this.cards       = [];
  }

  Player.prototype = {
  };

  return Player;
}();

module.exports = Player;
