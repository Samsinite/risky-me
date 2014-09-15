var Territory = function() {
  function Territory(id, name, group) {
    this.id                  = id;
    this.name                = name;
    this.group               = group;
    this.army                = null;
    this.adjacentTerritories = [];
  }

  this.prototype = {
  };

  return Territory;
}();

module.exports = Territory;
