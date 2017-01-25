const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
console.log('Public path:', publicPath);
var app    = express();
var port   = process.env.PORT || 3000;
var server = http.createServer(app);
var io     = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app [user]!! :)',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'He hast joned ',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', ( message ) => {
    console.log('createMessage', message);

    /* To everybody */
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    /* To everybody but Me */
    socket.broadcast.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });

  });

  socket.on('disconnect', () => {
    console.error('Disconnected user');
  });

});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
