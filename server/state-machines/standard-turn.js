var StateMachine = require('./server/state-machine');
var Attack       = require('./server/attack');

var transitionTo = StateMachine.transitionTo;

var createStateMachine = function(game, io) {
  var game          = game,
      io            = io,
      player        = game.players[0],
      armiesToPlace = game.armiesToPlace(player);

  sm = new StateMachine({
    initialState: 'placeArmies',

    states: {
      placeNewArmies: {
        placeArmies: function(p, armyPlacements) {
          return new RSVP.Promise(function(resolve, reject) {
            var isPlayerTurn = p.id === player.id

            var ownsTerritories = armyPlacements.every(function(armyPlacement) {
              player.territories.some(function(territory) {
                armyPlacement.terrority === terrority.id;
              })
            });

            var armyPlacementNumber = armyPlacements.reduce(function(previousValue, armyPlacement) {
              return previousValue + armyPlacement.units;
            }, 0);

            if (isPlayerTurn && ownsTerritories && armyPlacementNumber === armiesToPlace) {
              armyPlacements.forEach(function(armyPlacement) {
                var terrority = player.territories.filter(fcuntion(terrority) {
                  armyPlacement.terrority === territory.id;
                })[0];

                terrority.army.units += 1;
              })
              this.transitionTo('attack');
            }
            else {
              throw Exception("Handle error better here... - standard-turn.js#placeArmies");
            }
          });
        }
      },

      attack: {
        attackTerritory: function(attackingTerritoryId, defendingTerritoryId, attackingArmies) {

        },

        finishAttacking: function() {
          this.transitionTo('reinforceArmies');
        }
      },

      reinforceArmies: {
        reinforceTerritory: function(fromTerritoryId, toTerritoryId) {

        },

        completeTurn: function() {
          this.transitionTo('placeNewArmies');
        }
      }
    }
  });

  sm.beforeTransition({from: 'reinforceArmies', to: 'placeNewArmies'}, function() {
    if (player.id === players.length - 1 ) {
      player = this.players[0];
    }
    else {
      player = this.players[player.id + 1];
    }

    armiesToPlace = game.armiesToPlace(player);
  });

  return sm;
}
