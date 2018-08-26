const {generateMessage, generateLoc}=require('./utils/message');
//require('./config/config');
const http=require('http');
const socketIO=require('socket.io');
const path=require('path');
const publicPath=path.join(__dirname, '../public');

//const _ = require('lodash');

const express=require('express');
const bodyParser=require('body-parser');

//var {authenticate} = require('./middleware/authenticate');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//const port = process.env.PORT;
const port = process.env.PORT || 3000;

//app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMsg', generateMessage('admin','Welcome'));

  socket.broadcast.emit('newMsg', generateMessage('admin','user has joined'));

  socket.on('createMsg', (msg, callback) => {
    console.log('createMsg', msg );
    io.emit('newMsg', generateMessage(msg.from, msg.text));
    callback('from server');
  });

  socket.on('createLoc', (coords, callback) => {
    console.log('createLoc', coords );
    io.emit('newLoc', generateLoc(coords.from, coords.lat, coords.lng));
    callback('from server');
  });

  socket.on('disconnect', (socket) => {
    console.log('user disconnected from server');
  });

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
