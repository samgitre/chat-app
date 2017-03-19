var name = getQueryVariable('name')|| 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name +' wants to join ' + room);

var welcomeMessage = 'Hi, ' +name;
jQuery('.user-name').text(welcomeMessage);

// var $roomName = jQuery('ul .room-list li').click().val();
// jQuery('.room-name').text(roomName);

socket.on('connect', function () {
  console.log('User connected');
});

socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp);
  var $message = jQuery('.messages');

  console.log('new message');
  console.log(message.text);
  
  $message.prepend('<p> '+ message.text +'</p>')
  $message.prepend('<p> <strong>'+ message.name + '  ' + momentTimestamp.local().format('h:mm a')
  +'</strong></p>');

});

var $form = jQuery('#messager-form');
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
