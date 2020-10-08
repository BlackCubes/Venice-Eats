const mongoose = require('mongoose');
const slugify = require('slugify');

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
});

// VIRTUAL
// -- add onSite if the geo has been updated/added

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
// -- find query in DB
foodtruckSchema.statics.valueExists = function(query) {
  return this.findOne(query).then(result => result);
};

const Foodtrucks = mongoose.model('Foodtrucks', foodtruckSchema);

module.exports = Foodtrucks;
