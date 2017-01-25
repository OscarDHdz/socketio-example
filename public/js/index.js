var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Oscar',
  //   text: ';) !!!!!'
  // });


});

socket.on('newMessage', function ( message ) {
  console.log('newMessage', message);
});


socket.on('disconnect', function () {
  console.error('Disconnected from server');
});
