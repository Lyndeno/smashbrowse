// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

export const updateDirection = throttle(20, dir => {
  socket.emit(Constants.MSG_TYPES.DIRECTION, dir);
});

export const updateSpeed = throttle(20, speed => {
  // console.log(`Updating speed to ${speed} in networking.js`);
  if (speed < 0)
    socket.emit(Constants.MSG_TYPES.LEFTSPEED, speed);
  else if (speed == 0)
    socket.emit(Constants.MSG_TYPES.ZEROSPEED, speed);
  else if (speed > 0)
    socket.emit(Constants.MSG_TYPES.RIGHTSPEED, speed);
});

export const upFloor = throttle(20, deltaHeight => {
  socket.emit("upfloor", deltaHeight);
});

export const downFloor = throttle(20, deltaHeight => {
  socket.emit("downfloor", deltaHeight);
});