'use strict';

const Nodal = require('nodal');
const Itinerary = Nodal.require('app/models/itinerary.js');

class V1ItinerariesController extends Nodal.Controller {

  index() {

    Itinerary.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Itinerary.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Itinerary.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Itinerary.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Itinerary.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1ItinerariesController;
