const mongoose = require('mongoose');
const slugify = require('slugify');
const Geos = require('./geoModel');

const foodtruckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A foodtruck must have a name!'],
    unique: true,
    trim: true
  },
  slug: String,
  info: {
    type: String,
    trim: true
  },
  contact: {
    phoneNumber: String,
    email: String,
    website: String,
    social: {
      url1: String,
      url2: String,
      url3: String
    }
  },
  cloudinaryPhoto: {
    cloudinaryId: {
      type: String,
      required: [true, 'A foodtruck image needs to be in Cloudinary!']
    },
    cloudinaryUrl: {
      type: String,
      required: [true, 'A foodtruck image must have an image!']
    }
  },
  menu: {
    productName: {
      type: String,
      required: [true, 'A foodtruck product needs to have a name!'],
      unique: true,
      trim: true
    },
    slug: String,
    description: String,
    ingredients: [String],
    cloudinaryPhoto: {
      cloudinaryId: String,
      cloudinaryUrl: String
    },
    price: {
      type: Number,
      required: [true, 'A foodtruck product needs to have a price!']
    },
    orderLimit: {
      type: Number,
      required: [true, 'A foodtruck product needs to have an order limit!']
    },
    orderSold: {
      type: Number,
      default: 0
    },
    availability: {
      type: Boolean,
      required: [true, 'A foodtruck product needs to have an availability!']
    }
  },
  geo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Geo'
  },
  duration: {
    startDateTime: Date,
    endDateTime: Date
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
});

// INDEXES
foodtruckSchema.index({ slug: 1 });

// VIRTUAL
// -- calculate wait time
foodtruckSchema.virtual('menu.waitTime').get(function() {
  // The amount of time it takes to make each order for every 3 minutes (60 secs/min * 3 mins)
  return this.menu.orderSold * 60 * 3;
});

// -- add onSite if the geo has been updated/added
foodtruckSchema.virtual('onSite').get(function() {
  // If a foodtruck has a location, update that it is on site. NOTE: !this.geo produces TRUE if there are none, and so doubly negate it to produce the deisre result
  return !!this.geo;
});

// DOCUMENT MIDDLEWARE
// -- slugify the food truck's name
foodtruckSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// -- slugify the product name
foodtruckSchema.pre('save', function(next) {
  this.menu.slug = slugify(`${this.menu.productName}--${this.name}`, {
    lower: true
  });
  next();
});

// -- populate the geo json
foodtruckSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'geo',
    select: '-__v -id'
  });

  next();
});

// STATIC METHODS
// -- update the geo model if the spot has been taken
foodtruckSchema.statics.spotAvailable = async function(geoId) {
  const spotAvailability = await this.aggregate([
    {
      $match: { geo: geoId }
    },
    {
      $group: {
        _id: '$geo',
        boolSpot: { $toBool: !!this.geo }
      }
    }
  ]);

  if (spotAvailability.length > 0) {
    await Geos.findByIdAndUpdate(geoId, {
      'geo.free': spotAvailability[0].boolSpot
    });
  } else {
    await Geos.findByIdAndUpdate(geoId, {
      'geo.free': !!this.geo
    });
  }
};

// -- find query in DB
foodtruckSchema.statics.valueExists = function(query) {
  return this.findOne(query).then(result => result);
};

// MIDDLEWARE FOR CURRENT FOODTRUCK/GEO-MODEL
foodtruckSchema.post('save', function() {
  this.constructor.spotAvailable(this.geo);
});

foodtruckSchema.pre(/^findOneAnd/, async function(next) {
  this.s = await this.findOne();
  next();
});

foodtruckSchema.post(/^findOneAnd/, async function() {
  await this.s.constructor.spotAvailable(this.s.geo);
});

const Foodtrucks = mongoose.model('Foodtrucks', foodtruckSchema);

module.exports = Foodtrucks;
