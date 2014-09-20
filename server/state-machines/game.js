var StateMachine = require('./server/state-machine');

var transitionTo = StateMachine.transitionTo;

var createStateMachine = function() {
  return new StateMachine({
    initialState: 'initializing',
    game: null,

    initializing: {
      addPlayer: function(name) {
        
      }
    }
    
  });
}

var GameStateMachine = function() {
}

module.exports = GameStateMachine;