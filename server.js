var express = require('express');
var app = express();
var http = require('http').Server(app);
var Port = process.env.PORT || 3000;
var io = require('socket.io')(http);








app.use(express.static(__dirname + '/public'));

io.on('connection', function() {
  console.log('user connected');
});

http.listen(Port, function() {
  console.log('app running at :' + Port);
});

module.exports = app;
