const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();

// Serve up our webSocket client HTML
app.use(express.static('./public'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;
server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, sckt, head) => {
  socketServer.handleUpgrade(request, sckt, head, function done(socket) {
    socketServer.emit('connection', socket, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];
let id = 0;

socketServer.on('connection', (socket) => {
  const connection = { id: ++id, alive: true, socket: socket };
  connections.push(connection);

  // Forward messages to everyone except the sender
  socket.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.socket.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  socket.on('close', () => {
    const pos = connections.findIndex((o, i) => o.id === connection.id);

    if (pos >= 0) {
      connections.splice(pos, 1);
    }
  });

  // Respond to pong messages by marking the connection alive
  socket.on('pong', () => {
    connection.alive = true;
    console.log("pong")
  });
});

setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.socket.terminate();
    } else {
      c.alive = false;
      c.socket.ping();
      console.log("ping")
    }
  });
}, 10000);
