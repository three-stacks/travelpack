'use strict';

const Nodal = require('nodal');
const Budget = Nodal.require('app/models/budget.js');

class V1BudgetsController extends Nodal.Controller {

  index() {

    Budget.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Budget.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Budget.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Budget.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Budget.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1BudgetsController;
