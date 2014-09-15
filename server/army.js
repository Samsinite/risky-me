var Army = function() {
  function Army(player, territory) {
    this.player    = player;
    this.territory = territory;
    this.units = 0;
  }

  Army.prototype = {
  };

  return Army;
}();

module.exports = Army;