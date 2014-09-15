var Territory = function() {
  function Territory(id, name, group) {
    this.id    = id;
    this.name  = name;
    this.group = group;
  }

  this.prototype = {
    adjacentTerritories: [],
    army: null,

    getName: function() {
      return this.name;
    }
  };

  return Territory;
}();

module.exports = Territory;
