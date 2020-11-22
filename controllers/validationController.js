const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const validator = require('./../utils/validate');

const errMessage = errObj => {
  let message = '';
  Object.values(errObj).forEach(err => {
    message += `${err[0]} `;
  });

  return message.slice(0, -1);
};

exports.signup = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:2|max:70',
    email: 'required|email|exist:Users,email',
    password: 'required|string|min:8|max:60|confirmed|regexPass',
    password_confirmation: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 400));

    next();
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string|min:8|max:60|regexPass'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 400));

    next();
  });
});

exports.validateFoodtruck = catchAsync(async (req, res, next) => {
  let validationRule;

  if (!req.params.id) {
    validationRule = {
      name: 'required|string|min:6|max:100|exist:Foodtrucks,name',
      info: 'string|max:1000',
      'contact.phoneNumber': 'string|regexPhone',
      'contact.email': 'email',
      'contact.website': 'url',
      'contact.social.url1': 'url',
      'contact.social.url2': 'url',
      'contact.social.url3': 'url',
      'menu.productName': 'required|string|min:2|max:100',
      'menu.description': 'string|max:183',
      'menu.ingredients': 'array|regexArrString',
      'menu.price': 'required|numeric|min:1|regexPrice',
      'menu.orderLimit': 'required|numeric|min:5',
      'menu.availability': 'required|boolean',
      'duration.startDateTime': 'date',
      'duration.endDateTime': 'date'
    };
  } else {
    validationRule = {
      name: 'string|min:6|max:100|exist:Foodtrucks,name',
      info: 'string|max:1000',
      'contact.phoneNumber': 'string|regexPhone',
      'contact.email': 'email',
      'contact.website': 'url',
      'contact.social.url1': 'url',
      'contact.social.url2': 'url',
      'contact.social.url3': 'url',
      'menu.productName': 'string|min:2|max:100',
      'menu.description': 'string|max:183',
      'menu.ingredients': 'array|regexArrString',
      'menu.price': 'numeric|min:1|regexPrice',
      'menu.orderLimit': 'numeric|min:5',
      'menu.availability': 'boolean',
      'duration.startDateTime': 'date',
      'duration.endDateTime': 'date'
    };
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 400));

    next();
  });
});

exports.validateGeo = catchAsync(async (req, res, next) => {
  let validationRule;

  if (!req.params.id) {
    validationRule = {
      'geo.coordinates': 'required|array|regexGeo',
      'geo.address': 'required|string|regexAddress',
      free: 'boolean'
    };
  } else {
    validationRule = {
      'geo.coordinates': 'array|regexGeo',
      'geo.address': 'string|regexAddress',
      free: 'boolean'
    };
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 400));

    next();
  });
});

exports.validateEvent = catchAsync(async (req, res, next) => {
  let validationRule;

  if (!req.params.id) {
    validationRule = { eventDate: 'required|date' };
  } else {
    validationRule = { eventDate: 'required|date' };
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 400));

    next();
  });
});
