'use strict';

const Nodal = require('nodal');
const Pack = Nodal.require('app/models/pack.js');

class V1PacksController extends Nodal.Controller {

  index() {

    Pack.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Pack.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Pack.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Pack.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Pack.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1PacksController;
