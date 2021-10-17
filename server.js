const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, '/client/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const messages = [];
const users = [];

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
    console.log('messages', messages)
  });
  socket.on('login', (login) => {
    console.log('I added new user to active users' + socket.id);
    users.push(login);
    // socket.broadcast.emit('newUser', login);
    // console.log('login', login)
    // console.log('users', users);
  });
  socket.on('newUser', (login) => {
    socket.broadcast.emit('newUser', login);
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    users.splice(users.indexOf(socket.id, 1));
    // console.log('users', users);
    console.log('I remove user from users' + socket.id);
    socket.broadcast.emit('removeUser', {author: 'Chat Bot', content: 'has left the conversation... :('});
  });
  console.log('I\'ve added a listener on message and disconnect events \n');

});
