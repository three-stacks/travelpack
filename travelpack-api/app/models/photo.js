'use strict';

const Nodal = require('nodal');

class Photo extends Nodal.Model {}

Photo.setDatabase(Nodal.require('db/main.js'));
Photo.setSchema(Nodal.my.Schema.models.Photo);

module.exports = Photo;
