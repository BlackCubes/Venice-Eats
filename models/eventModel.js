const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    eventDate: {
      type: Date,
      required: [true, 'An event must have a date!']
    },
    foodtrucks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Foodtrucks'
      }
    ],
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE
// -- populate foodtrucks
eventSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'foodtrucks',
    select: '-__v -id'
  });

  next();
});

const Veniceevents = mongoose.model('Events', eventSchema);

module.exports = Veniceevents;
