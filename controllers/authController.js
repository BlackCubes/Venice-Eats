const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const Users = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { User } = require('../../Film-Ticket-Website/models');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await Users.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError('The user belonging to this token does not exist!', 401)
    );

  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password! Please log in again!', 401)
    );

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.checkLogin = (req, res, next) => {
  if (req.cookies.jwt)
    return next(new AppError('You are still logged in!', 403));

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }

    next();
  };
};

exports.verifyPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body.password;

  if (!password) return next(new AppError('Please provide a password!', 400));

  const user = await Users.findById(req.user.id).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect password!', 401));

  next();
});
