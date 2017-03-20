var name = getQueryVariable('name')|| 'Anonymous';
var room = getQueryVariable('room');
var socket = io();


var welcomeMessage = 'Hi, ' +name;
 $('.user-name').text(welcomeMessage);
 $('.room-name').text('Room: ' + room);


socket.on('connect', function () {
  console.log('User connected');
  socket.emit('JoinRoom', {
    name :name,
    room : room
  });
});


socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp);
  var $message = $('.messages');

  console.log('new message');
  console.log(message.text);

  $message.prepend('<p> '+ message.text +'</p>')
  $message.prepend('<p> <strong>'+ message.name + '  ' + momentTimestamp.local().format('h:mm a')
  +'</strong></p>');
});

var $form = $('#messager-form');
$form.on('submit', function(event){
  event.preventDefault();
  var $message = $form.find('input[name=messenger]');
    socket.emit('message', {
      name: name,
      text:$message.val()
    });
      $message.val('');
      $message.focus();
});
