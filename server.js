var express = require('express');
var app = express();
var http = require('http').Server(app);
var Port = process.env.PORT || 3000;
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('message', function(message) {
    console.log('message recieved' + message.text);
    socket.broadcast.emit('message', message);
  });

  socket.emit('message',{
    text : 'Welcome to nitechsy group forum'
  });
});

http.listen(Port, function() {
  console.log('app running at :' + Port);
});

module.exports = app;
