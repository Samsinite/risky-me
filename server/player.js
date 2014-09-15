var Player = function() {
  function Player(id, name) {
    this.id          = id;
    this.name        = name;
    this.territories = [];
    this.cards       = [];
  }

  Player.prototype = {
    territoryGroups: function() {
      var groups = [];

      this.territories.forEach(function(territory) {
        var group = territory.group;

        var found = groups.some(function(existingGroup) {
          return existingGroup.id === group.id;
        });

        if (!found) {
          groups.push(group);
        }
      });

      return territoryGroups;
    },

    groupsControlled: function() {
      var territoryGroups = this.territoryGroups(),
          self            = this;

      return territoryGroups.filter(function(group) {
        group.territories.every(function(groupTerritory) {
          return self.territories.some(function(conqueredTerritory) {
            return conqueredTerritory.id === groupTerritory.id;
          })
        })
      });
    },

    extraUnitsEachTurn: function() {
      var groupsControlled = this.groupsControlled();

      var unitsFromGroups = groupsControlled.reduce(function(previousValue, group) {
        return previousValue + group.additionUnits;
      }, 0);

      return Math.floor(this.territories.length / 3) + unitsFromGroups;
    }
  };

  return Player;
}();

module.exports = Player;
