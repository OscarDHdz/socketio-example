const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var publicPath = path.join(__dirname, '../public');
console.log('Public path:', publicPath);
var app    = express();
var port   = process.env.PORT || 3000;
var server = http.createServer(app);
var io     = socketIO(server);
var users  = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if ( !isRealString(params.name) || !isRealString(params.name) ) {
        return callback('Name and room name are required.');
    }
    socket.join(params.room);
    // Remove from any potential other room
    users.removeUser(socket.id);
    // Add to new Room
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));



    // To single dude
    socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app ${params.name}`));
    // To everyone excent dude
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',  `${params.name} has joined`));


    callback();
  });

  socket.on('createMessage', ( message, callback ) => {
    var user = users.getUser(socket.id);

    if ( user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name,  message.text) );
    }

    /* To everybody but Me */
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if ( user ) {
      io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }


  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if ( user ) {
      console.log(user);
      console.log(user.room);

      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }

    console.log('Disconnected user');
  });

});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
