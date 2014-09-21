var RSVP   = require('rsvp');
var Player = require('./server/player');

var Game = function() {
  var asyncLocks = {
    isAddingPlayer: false
  };

  function Game() {
    this.players = []
  }

  // Eliminate chance for race conditions on Single Threaded NodeJS servers.
  function _waitFor(symbol, callback) {
    var args = arguments[2] || [],
        delay = arguments[3] || 300;

    if (asyncLocks[symbol]) {
      setTimeout(function() {
        _waitFor(symbol, callback, delay);
      })
    }
    else {
      try {
        asyncLocks[symbol] = true;

        callback();
      }
      finally {
        asyncLocks[symbol] = false;
      }
    }
  }

  Game.prototype = {
    playerCount: function() {
      return this.players.length;
    },

    join: function(uuid, username) {
      var self = this;

      return new RSVP.Promise(function(resolve, reject) {
        _waitFor("isAddingPlayer", function() {
          var isExisting = this.players.some(function(player) {
            return player.name === username;
          })

          if (!isExisting) {
            var userId = this.playerCount();
                player = new Player(uuid, userId, username);

            this.players.push(player);

            resolve({
              result: "gameJoined",

              details: {
                userId: userId,
                name: player.name
              }
            })
          }
          else {
            reject({
              result: "error",

              details: {
               reason: "This username is already taken :)"
              }
            });
          }
        }, arguments);
      });
    },

    user: function(uuid) {
      var self = this;

      return new RSVP.Promise(function(resolve, reject) {
        var player = self.players.filter(function(player) {
          player.uuid === uuid;
        })[0];

        if (player) {
          resolve(player);
        }
        else {
          reject("Unkown socket id of " + uuid)
        }
      });
    },

    process_action: function(player, action) {

    }
  };

  return Game;
}

module.exports = Game;