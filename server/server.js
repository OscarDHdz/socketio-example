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

  socket.on('disconnect', () => {
    console.error('Disconnected user');
  });

});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
