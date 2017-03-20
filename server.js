var express = require('express');
var app = express();
var http = require('http').Server(app);
var Port = process.env.PORT || 3000;
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('JoinRoom', function(req) {
    clientInfo[socket.id] = req;
    socket.join(req.room);

    socket.broadcast.to(req.room).emit('message',{
      name :'System',
      text: req.name + ' has joined !',
      timestamp : moment().valueOf()
    });
  });

  socket.on('message', function(message) {
    console.log('message recieved' + message.text);
    message.timestamp = moment.valueOf();
   io.to(clientInfo[socket.id].room).emit('message', message);
    //socket.broadcast.emit('message', message);
  });

  socket.emit('message', {
  		name: 'System',
  		text: 'Welcome to the nitechsy group chat application!',
  		timestamp: moment().valueOf()
  	});
});

http.listen(Port, function() {
  console.log('app running at :' + Port);
});
module.exports = app;
