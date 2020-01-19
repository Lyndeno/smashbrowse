const Constants = require('../shared/constants');

class Building {
  constructor() {
    this.serverList = [new Server()];
    this.exploding = false;
  }

  explode() {

  }

  update(dt) {
    if (this.serverList.length == 0) {
        explode();
    }
  }
}

module.exports = Building;
