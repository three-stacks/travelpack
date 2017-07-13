'use strict';

const Nodal = require('nodal');

class CreateBudgets extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017071315105603;
  }

  up() {

    return [
      this.createTable("budgets", [{"name":"pack_id","type":"int"},{"name":"item","type":"string"},{"name":"number","type":"int"},{"name":"cost","type":"int"},{"name":"total_cost","type":"int"},{"name":"cost_per_person","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("budgets")
    ];

  }

}

module.exports = CreateBudgets;
