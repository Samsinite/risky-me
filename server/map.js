var TerritoryGroup = require('./server/territory-group');
var Territory      = require('./server/territory');

/**
Example Map:
var map = new Map({
  groups: {
    "North America": {
      additionArmies: 5,

      "Alaska": {
        id: 1
        ...
      },

      ...
    },

    "South America": {
      ...
    },

    ...
  },

  connections: [
    [1, 5], // both connected country id's
    ...
  ]
})
**/

var Map = function() {
  var buildMap = function(territoryGroupSettins) {
    var territorieGroups = [];
    var territories      = [];

    for (var territoryGroupSettings in settings) {
      var territoryGroup = new TerritoryGroup(territoryGroups.length,
                                              territoryGroupSettings.name,
                                              territorySettings.additionArmies);

      for (var territorySettings in territoryGroupSettings) {
        var territory = new Territory(territories.length, territorySettings.name)

        territoryGroup.territories.push(territory);
        territories.push(territory);
      }

      territoryGroups.push(territoryGroup);
    }

    return {
      territoryGroups: territoryGroups
      territories: territories
    };
  };

  var connectTerritories = function(connectionMap) {
    for (var i = 0; i < connectionMap.length; i++) {
      var connection = connectionMap[i],
          side1      = null;
          side2      = null;

      for (var j = 0; j < this.territories.length; j++) {
        if (this.territories[j].name === connection[0]) {
          side1 = territories[j];
        }

        if (this.territories[j].name === connection[1]) {
          side2 = territories[j];
        }

        if (side1 && side2) {
          break;
        }
      }

      if (side1 == side2) {
        throw "A territory cannot be connected to itself";
      }

      if (!side1 || !side2) {
        throw "One of the connected territores was not found";
      }

      side1.adjacentTerritories.push(side2);
      side2.adjacentTerritories.push(side1);
    }
  };

  function Map(settings) {
    map = buildMap(settings.groups);

    this.territoryGroups = map.territoryGroups;
    this.territories     = map.territories;

    connectTerritories.call(this, map.connections)
  }

  Map.prototype = {
  };

  return Map
}();

module.exports = Map;
