const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  geo: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    free: {
      type: Boolean,
      default: true
    }
  }
});

const Geo = mongoose.model('Geo', geoSchema);

module.exports = Geo;
