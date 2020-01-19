const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');

var numberOfPlayers = 0;

// Setup an Express server
const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.DIRECTION, handleDirection);
  socket.on(Constants.MSG_TYPES.LEFTSPEED, leftSpeed);
  socket.on(Constants.MSG_TYPES.ZEROSPEED, zeroSpeed);
  socket.on(Constants.MSG_TYPES.RIGHTSPEED, rightSpeed);
  socket.on(Constants.MSG_TYPES.DISCONNECT, onDisconnect);
  socket.on("upfloor", upFloor);
  socket.on("downfloor", downFloor);
});

// Setup the Game
const game = new Game();

function joinGame(username) {
  game.addPlayer(this, username, numberOfPlayers);
  numberOfPlayers += 1;
}

function leftSpeed() {
  // console.log(`leftSpeed in server.js. speed=-40`);
  game.handleSpeed(this, -40);
}

function zeroSpeed() {
  // console.log(`zeroSpeed in server.js. speed=${0}`);
  game.handleSpeed(this, 0);
}

function rightSpeed() {
  // console.log(`rightSpeed in server.js. speed=40`);
  game.handleSpeed(this, 40);
}

function upFloor() {
  game.changeFloorGame(this, 1);
}

function downFloor() {
  game.changeFloorGame(this, -1);
}

function handleDirection(dir) {
  // console.log(`handleDirection in server.js. dir=${dir}`);
  game.handleDirection(this, dir);
}

function onDisconnect() {
  game.removePlayer(this);
}