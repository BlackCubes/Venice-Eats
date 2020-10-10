const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
    minlength: [2, 'Please enter a name with a minimum of 2 characters!'],
    maxlength: [70, 'Please enter a name less than or equal to 70 characters!']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: [8, 'A password must be at least 8 characters!'],
    maxlength: [60, 'A password must be less than or equal to 60 characters!'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'The password are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
