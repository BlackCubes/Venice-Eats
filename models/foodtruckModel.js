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
    name: {
      type: String,
      required: [true, 'A foodtruck product needs to have a name!']
    },
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

const Foodtrucks = mongoose.model('Foodtrucks', foodtruckSchema);

module.exports = Foodtrucks;
