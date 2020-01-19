// import { onKeyInput } from '../server/input.js';
var numberOfPlayers = require('./server')
const Constants = require('../shared/constants');
const Floor = require('./floor');
const Mainframe = require('./mainframe');

const {MAP_SIZE, FLOOR_HEIGHT, FLOOR_OFFSET, PLAYER_HEIGHT} = Constants;

class Player {
  constructor(id, username, playerNumber) {
    this.id = id;
    this.username = username;
    this.claimedFloors = [new Floor(id)];
    this.x = 200;
    this.y = MAP_SIZE - FLOOR_OFFSET - PLAYER_HEIGHT - ((playerNumber-1)*FLOOR_HEIGHT);
    this.fireCooldown = 0;
    this.score = 0;
    this.speed = 0;
  }

  setDirection(dir) {
    this.direction = dir;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  changeFloorPlayer(deltaFloor) {

    //if (this.y < 622 && deltaFloor<0) {// || (this.y > (623+(FLOOR_HEIGHT*numberOfPlayers)) && deltaFloor>0) ) {
      this.y -= (deltaFloor*FLOOR_HEIGHT);
      console.log(`this.y: ${this.y}`);
    // }
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    // console.log(`this.x: ${this.x}`);
    this.x += dt * this.speed;
    //this.y -= 0;//dt * this.speed * this.direction;
    
    // Update score
    for (let i=0; i<this.claimedFloors.length; i++) {
      for (let j=0; j<this.claimedFloors[i].mainframeList.length; j++) {
        this.score += this.claimedFloors[i].mainframeList[j].incomePerSecond;
      }
    }

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      // return new Bullet(this.id, this.x, this.y, this.direction);
    }
  }

  // takeBulletDamage() {
  //   this.hp -= Constants.BULLET_DAMAGE;
  // }

  // onDealtDamage() {
  //   this.score += Constants.SCORE_BULLET_HIT;
  // }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      direction: this.direction,
      hp: this.hp,
    };
  }
}

module.exports = Player;
