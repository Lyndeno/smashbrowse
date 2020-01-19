// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';
// import { getCurrentPlayerCount } from '../server/server';

const Constants = require('../shared/constants');
// const game = require('../server/server');
// const Game = require('../server/game');
// const { game } = ServerClass;

const { PLAYER_RADIUS, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE, FLOOR_HEIGHT, FLOOR_WIDTH } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, bullets } = getCurrentState();
  if (!me) {
    return;
  }
  // console.log(`Object.getOwnPropertyNames(others): ${Object.getOwnPropertyNames(others)}`);
  // console.log(`others.length: ${others.length}`);
  // const {numberOfPlayers} = getCurrentPlayerCount()
  // Draw background
  renderBackground(me.x, me.y, others.length);

  // Draw boundaries
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));

  
}

function renderBackground(x, y, numberOfOtherPlayers) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'black');
  backgroundGradient.addColorStop(1, 'gray');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw all floors
  // console.log(numberOfOtherPlayers);
  // exports.index = index;
  for (let i=0; i<numberOfOtherPlayers+1; i++) {
    // console.log(i);
    renderBuildling(x, y, i);
  }
}

//Renders the building floors for each player
function renderBuildling(x, y, index) {
  context.save();
  context.drawImage(
    getAsset('office.png'),
    (MAP_SIZE-FLOOR_WIDTH)/2 - x + canvas.width / 2,
    MAP_SIZE - FLOOR_HEIGHT - (FLOOR_HEIGHT*index) - y + canvas.height / 2,
  );
  context.restore();
}

// Renders a player at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw player
  context.save();
  context.translate(canvasX, canvasY);
  context.drawImage(
    getAsset('player.png'),
    0,
    3,
  );
  context.restore();
  console.log(`x: ${x}`);
  console.log(`y: ${y}`);

  // Draw health bar
  // context.fillStyle = 'green';
  // context.fillRect(
  //   canvasX - PLAYER_RADIUS,
  //   canvasY + PLAYER_RADIUS + 8,
  //   PLAYER_RADIUS * 2,
  //   2,
  // );
  // context.fillStyle = 'red';
  // context.fillRect(
  //   canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
  //   canvasY + PLAYER_RADIUS + 8,
  //   PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
  //   2,
  // );
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
