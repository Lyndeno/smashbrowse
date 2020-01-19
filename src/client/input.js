// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateSpeed, upFloor, downFloor } from './networking';

function onKeyUp(e) {
  const speed = 0;
  updateSpeed(speed);
  // console.log("OnKeyInput!");
  // var code = e.which || e.keyCode;
  // console.log(`e.which: ${e.which}`);
  // console.log(`e.keyCode: ${e.keyCode}`);
  // if (code == 38) {
  //     // Up
  // }
  // else if (code == 40) {
  //     // Down
  // }
  // else if (code == 37) {
  //    // Left
  //    const speed = -5;
  //    updateSpeed(speed);
  // }
  // else if (code == 39) {
  //    // Right
  //    const speed = -5;
  //    updateSpeed(speed);
  // }
}

function onKeyDown(e) {
  // console.log("OnKeyInput!");
  var code = e.which || e.keyCode;
  console.log(`e.which: ${e.which}`);
  console.log(`e.keyCode: ${e.keyCode}`);
  if (code == 38) {
      // Up
      const deltaHeight = 1;
      upFloor(deltaHeight);
  }
  else if (code == 40) {
      // Down
      const deltaHeight = -1;
      downFloor(deltaHeight);
  }
  else if (code == 37) {
     // Left
     const speed = -5;
     updateSpeed(speed);
  }
  else if (code == 39) {
     // Right
     const speed = 5;
     updateSpeed(speed);
  }
}

function onMouseInput(e) {
  // console.log("OnMouseInput!");
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  
  // console.log(`dir: ${dir}`);
  if (dir <= 0 && dir >= -3.14159265)
    updateSpeed(speed-5);
  else if (dir >= 0 && dir <= 3.14159265)
    updateSpeed(speed+5);
  // updateDirection(dir);
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
}
