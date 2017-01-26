const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');


var publicPath = path.join(__dirname, '../public');
console.log('Public path:', publicPath);
var app    = express();
var port   = process.env.PORT || 3000;
var server = http.createServer(app);
var io     = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // To single dude
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app [user]!! :)'));

  // To everyone excent dude
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'He hast joned '));

  socket.on('createMessage', ( message, callback ) => {
    console.log('createMessage', message);

    /* To everybody but Me */
    io.emit('newMessage', generateMessage(message.from,  message.text) );
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));

  });

  socket.on('disconnect', () => {
    console.error('Disconnected user');
  });

});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
