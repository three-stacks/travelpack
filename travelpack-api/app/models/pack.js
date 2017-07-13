'use strict';

const Nodal = require('nodal');

class Pack extends Nodal.Model {}

Pack.setDatabase(Nodal.require('db/main.js'));
Pack.setSchema(Nodal.my.Schema.models.Pack);

module.exports = Pack;
