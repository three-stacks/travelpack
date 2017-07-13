'use strict';

const Nodal = require('nodal');

class Budget extends Nodal.Model {}

Budget.setDatabase(Nodal.require('db/main.js'));
Budget.setSchema(Nodal.my.Schema.models.Budget);

module.exports = Budget;
