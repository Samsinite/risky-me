var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat', function(id, msg) {
    Game.find('user', id).then(function(user) {
      io.emit('chat', user.name + ": " + msg);
    }, function() {
      /* no-op, cannot chat without joining game... */
      console.log('socket id ' + id + "tried to send a msg before joining the game: " + msg);
    });
  });

  socket.on('join game', function(id, msg) {
    try {
      var action = JSON.parse(msg);

      Game.join(action.name).then(function(response) {
        socket.broadcast.to(id).emit('join game', JSON.stringify(response)); 
      }, function(error) {
        socket.broadcast.to(id).emit('join game', JSON.stringify(error)); 
      })
  })

  socket.on('action', function(id, msg) {
    try {
      var action = JSON.parse(msg);

      Game.find('user', id).then(function(user) {
        Game.process_action(user, io).then(function(response) {
          io.emit('action', JSON.stringify(response));
        }, function(error) {
          io.emit('action', JSON.stringify(error));
        });
      }, function() {
        console.log('Socket id ' + id + 'tried to send the action ' + action + 'without joinning the game');
      });
    }
    catch (e) {
      console.log("Unkown Error: ", e);
    }
  })
});

http.listen(process.env.PORT || 3123, function(){
  console.log('listening on *:3000');
});