'use strict';

const Nodal = require('nodal');

class CreatePacks extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017071315084665;
  }

  up() {

    return [
      this.createTable("packs", [{"name":"name","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("packs")
    ];

  }

}

module.exports = CreatePacks;
