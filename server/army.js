var Army = function() {
  function Army(player, territory) {
    this.player    = player;
    this.territory = territory;
  }

  Army.prototype = {
    troops: 0,

    getPlayer: function() {
      return this.player;
    },

  };

  return Army;
}();

module.exports = Army;