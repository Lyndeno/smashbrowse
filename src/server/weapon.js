const Constants = require('../shared/constants');

class Weapon {
  constructor(type) {
    if (type == "bat") {
        this.damage = 10;
        this.swingRate = 1; //swings per second
    }
    else if (type == "hammer") {
        this.damage = 15;
        this.swingRate = 2; //swings per second
    }
    else if (type == "axe") {
        this.damage = 40;
        this.swingRate = 1; //swings per second
    }
    else if (type == "mace") {
        this.damage = 50;
        this.swingRate = 1.5; //swings per second
    }
    else if (type == "maul") {
        this.damage = 200;
        this.swingRate = 0.5; //swings per second
    }
  }

//   update(dt) {
//     if (this.serverList.length == 0) {
//         explode();
//     }
//   }
}

module.exports = Weapon;
