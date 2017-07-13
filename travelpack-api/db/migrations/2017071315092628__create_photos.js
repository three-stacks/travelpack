'use strict';

const Nodal = require('nodal');

class CreatePhotos extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017071315092628;
  }

  up() {

    return [
      this.createTable("photos", [{"name":"pack_id","type":"int"},{"name":"url","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("photos")
    ];

  }

}

module.exports = CreatePhotos;
