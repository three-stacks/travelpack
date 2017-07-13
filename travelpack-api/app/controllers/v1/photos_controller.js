'use strict';

const Nodal = require('nodal');
const Photo = Nodal.require('app/models/photo.js');

class V1PhotosController extends Nodal.Controller {

  index() {

    Photo.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Photo.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Photo.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Photo.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Photo.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1PhotosController;
