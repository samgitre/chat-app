var express = require('express');
var app = express();
var http = require('http').Server(app);
var Port = process.env.PORT || 3000;
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('message', function(message) {
    console.log('message recieved' + message.text);
    message.timestamp = moment.valueOf();
    io.emit('message', message);
    //socket.broadcast.emit('message', message);
  });

  // socket.emit('message',{
  //   name: 'System',
  //   text : 'Welcome to nitechsy group forum',
  //   timestamp: moment.valueOf()
  // });
});

http.listen(Port, function() {
  console.log('app running at :' + Port);
});
module.exports = app;
