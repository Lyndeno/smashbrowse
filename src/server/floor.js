const Constants = require('../shared/constants');
const Mainframe = require('./mainframe');

class Floor {
  constructor(id) {
    this.mainframeList = [new Mainframe()];
    this.claimedBy = id;
  }

  explode() {

  }

  update(dt) {
    if (this.mainframeList.length == 0) {
        explode();
    }
  }
}

module.exports = Floor;
