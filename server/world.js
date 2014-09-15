var World = function() {
  function World(map) {
    this.map     = map
    this.players = [];
  }

  World.prototype = {
    addPlayer: function(name) {
      this.players.push(new Player(this.players.length + 1, name));
    },

    doAttack: function(attackingTerritoryId, defendingTerritoryId, attackingUnits) {
    // TODO
    }
  };

  return World;
}();

module.exports = World;
