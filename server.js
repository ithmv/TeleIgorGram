// Basic chat server using Express and Socket.IO
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  let username;

  socket.on('login', (name) => {
    username = name && name.trim() ? name.trim() : 'Anonymous';
    socket.emit('login:success', username);
    socket.broadcast.emit('message', { username: 'system', text: `${username} joined` });
  });

  socket.on('message', (text) => {
    if (!username || !text) return;
    const msg = { username, text };
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    if (username) {
      io.emit('message', { username: 'system', text: `${username} left` });
    }
  });
});

server.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT);
});
