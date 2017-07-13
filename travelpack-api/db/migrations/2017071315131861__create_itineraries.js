'use strict';

const Nodal = require('nodal');

class CreateItineraries extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017071315131861;
  }

  up() {

    return [
      this.createTable("itineraries", [{"name":"pack_id","type":"int"},{"name":"name","type":"string"},{"name":"activity","type":"string"},{"name":"url","type":"string"},{"name":"photo","type":"string"},{"name":"date","type":"string"},{"name":"time","type":"string"},{"name":"like","type":"int"},{"name":"unlike","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("itineraries")
    ];

  }

}

module.exports = CreateItineraries;
