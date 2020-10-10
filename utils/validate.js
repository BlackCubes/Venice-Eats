const Validator = require('validatorjs');
const Models = require('./../models');
const capitalize = require('./capitalize');

module.exports = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};
