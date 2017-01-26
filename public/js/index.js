var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Oscar',
  //   text: ';) !!!!!'
  // });


});

socket.on('newMessage', function ( message ) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function ( message ) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    text: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);

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
      messageTextBox.val('').focus();
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
