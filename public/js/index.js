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
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function ( message ) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', `${message.url}`);

  li.append(a);
  $('#messages').append(li);
});

socket.on('disconnect', function () {
  console.error('Disconnected from server');
});


$(document).ready(function () {

  $('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function () {
      // Clear at Server aknowlaadge
      messageTextBox.val('')
    });


  });

  var locationButton = $('#send-location');
  locationButton.on('click', function () {
    if ( !navigator.geolocation ){
      locationButton.attr('disabled', 'disabled').text('Send Location');
      return alert('No Geolocation supported by your browser');
    }

    locationButton.text('Sending location...');


    navigator.geolocation.getCurrentPosition(function (position) {

      locationButton.text('Send location');

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })

    }, function () {
      locationButton.attr('disabled', 'disabled').text('Send Location');
      alert('Unable to fetch location');
    });

  });

});
