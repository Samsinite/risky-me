var StateMachine = require('./server/state-machine');
var Game    = require ('./server/state-machine/game')();

var transitionTo = StateMachine.transitionTo;

var createStateMachine = function(io) {
  var game = new Game(),
      playerTurn = null,
      io   = io;

  var sm = new StateMachine({
    initialState: 'initializing',

    states: {
      waitingForPlayers: {

        addPlayer: function(id, name) {
          return game.join(id, name);
        },

        // removePlayer: function() {

        // }

        startGame: function(name) {
          if (game.playerCount() > 1) {
            this.transitionTo('inProgress');
          }
        }
      },

      // The state where territories are chosen by players, then armies placed.
      setupTerritories: {
        action: function(player, action) {

        }

        // selectTerritory: function(player, territoryId) {

        // },

        // placeArmy: function(player, territoryId) {

        // }
      },

      playing: {
        action: function(id, action) {

        }
      },

      complete: {
        winner: function() {
          return {
            "action": "gameOver",
          
            "details": {
              "winner": this.player.id
            }
          };
        }
      }
    }
  });

  sm.beforeTransition({from: "waitingForPlayers", to: "inProgress"}, function() {
    playerTurn = game.user(0);

  }

  return sm;
}

var GameStateMachine = function() {
}

module.exports = GameStateMachine;