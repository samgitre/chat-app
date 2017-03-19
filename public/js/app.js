var socket = io();

socket.on('connect', function () {
  console.log('User connected');
});

socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp);
  console.log('new message');
  console.log(message.text);
  jQuery('.messages').append('<p> <strong>'+momentTimestamp.local().format('h:mm a')
  +'</strong>' +' : '+ message.text + '</p>')
});

var $form = jQuery('#messager-form');
$form.on('submit', function(event){
  event.preventDefault();
  var $message = $form.find('input[name=messenger]');
    socket.emit('message', {
      text:$message.val()});
      $message.val('');
      $message.focus();
});
