var socket = io();

socket.on('connect', function () {
  console.log('User connected');
});


socket.on('message', function(message) {
  console.log('new message');
  console.log(message.text);
});
