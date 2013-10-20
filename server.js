var io = require('socket.io').listen(8080)
    , sockets = [];

io.sockets.on('connection', function (socket) {
    sockets.push(socket);

  socket.emit('message', "connected");

  socket.on('message', function (data) {
      console.log(data);
      emitToOtherSockets(data, socket);
  });
});

function emitToOtherSockets(data, emittingSocket)
{
    for (var socket in sockets)
    {
        if (sockets[socket] != emittingSocket)
            sockets[socket].emit('message', data);
    }
}
