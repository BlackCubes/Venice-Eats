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
