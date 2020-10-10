const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema(
  {
    geo: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        required: [true, 'A geo must have coordinates!']
      },
      address: {
        type: String,
        required: [true, 'A geo must have an address!']
      }
    },
    free: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// INDEXES
geoSchema.index({ geo: '2dsphere' });

// VIRTUALS
// -- populate foodtrucks
geoSchema.virtual('foodtrucks', {
  ref: 'Foodtrucks',
  foreignField: 'geo',
  localField: '_id'
});

const Geos = mongoose.model('Geo', geoSchema);

module.exports = Geos;
