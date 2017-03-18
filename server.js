var express = require('express');
var app = express();
var http = require('http').Server(app);
var Port = process.env.PORT || 3000;








app.use(express.static(__dirname + '/public'));

http.listen(Port, function() {
  console.log('app running at :' + Port);
});

module.exports = app;
