var TerritoryGroup = function() {
  function TerritoryGroup(id, name, additionUnits) {
    this.id             = id;
    this.name           = name;
    this.additionUnits = additionUnits;
    this.territories    = [];
  }

  TerritoryGroup.prototype = {
  };

  return TerritoryGroup
}();

module.exports = TerritoryGroup;
