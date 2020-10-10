const Models = require('./../models');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Models[Model].create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
