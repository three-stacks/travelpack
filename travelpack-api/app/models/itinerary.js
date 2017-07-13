'use strict';

const Nodal = require('nodal');

class Itinerary extends Nodal.Model {}

Itinerary.setDatabase(Nodal.require('db/main.js'));
Itinerary.setSchema(Nodal.my.Schema.models.Itinerary);

module.exports = Itinerary;
