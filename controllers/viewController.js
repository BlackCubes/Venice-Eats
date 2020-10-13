const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Models = require('./../models');

exports.getHome = catchAsync(async (req, res, next) => {
  const something = 'This is a test!';

  res.status(200).render('home', {
    title: 'Venice Eats!',
    something
  });
});
