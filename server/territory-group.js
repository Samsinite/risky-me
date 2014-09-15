var TerritoryGroup = function() {
  function TerritoryGroup(id, name, additionArmies) {
    this.id             = id;
    this.name           = name;
    this.additionArmies = additionArmies
  }

  TerritoryGroup.prototype = {
    territories: []
  };

  return TerritoryGroup
}();

module.exports = TerritoryGroup;
