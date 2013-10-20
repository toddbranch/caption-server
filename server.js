var io = require('socket.io').listen(8080)
    , sockets = [];

io.sockets.on('connection', function (socket) {

  socket.on('message', function (data) {
      console.log(data);
      emitToOtherSockets(data, socket);
  });

  socket.on('disconnect', function () {
      console.log('disconnect!');
      removeSocketFromArray(socket);
      updateNumberOfPlayers(sockets[0]);
  });

    sockets.push(socket);
    updateNumberOfPlayers(socket);
});

function updateNumberOfPlayers(socket)
{
	if (socket)
	{
			var playerObj = {"players": sockets.length};
			socket.emit('message', playerObj);
			emitToOtherSockets(playerObj, socket);
		}
}

function emitToOtherSockets(data, emittingSocket)
{
    for (var socket in sockets)
    {
        if (sockets[socket] != emittingSocket)
            sockets[socket].emit('message', data);
    }
}

function removeSocketFromArray(disconnectingSocket)
{
    for (var i in sockets)
    {
        if (sockets[i] === disconnectingSocket)
        {
            // remove element
            sockets.splice(i, 1);
            console.log("removed!");
        }
    }
}
