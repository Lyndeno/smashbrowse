const Constants = require('../shared/constants');

class Mainframe {
  constructor() {
    this.hp = 100;
    this.clockRate = 1000000000; //1GHz
    this.RAM = 1000000000; //1GB
    this.armourFactor = 1;
    this.popularity = 10;
    this.deltaPopularity = 5;
    this.operationMode = "server";
    this.incomePerSecond = this.popularity*0.1;
  }

  explode() {

  }

  update(dt) {
    this.popularity += this.deltaPopularity*dt;

    if (this.hp == 0) {
        explode();
    }
  }
}

module.exports = Mainframe;