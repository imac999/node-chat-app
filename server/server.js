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

  socket.on('disconnect', (socket) => {
    console.log('user disconnected from server');
  });
  
});



server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
