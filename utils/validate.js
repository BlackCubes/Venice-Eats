const Validator = require('validatorjs');
const Models = require('./../models');
const capitalize = require('./capitalize');

const regexPhone = /^[(]\d{3}[)]\s?\d{3}[-]\d{4}$/;
const regexPrice = /^(?!0*\.0+$)\d*(?:\.\d+)?$/;

Validator.register(
  'regexArrString',
  function(val) {
    return val.every(el => typeof el === 'string');
  },
  'Please only provide non-numericals.'
);
Validator.register(
  'regexPhone',
  val => regexPhone.test(val),
  'Please provide a valid phone number in the form of (###)###-#### or (###) ###-####.'
);
Validator.register(
  'regexPrice',
  val => regexPrice.test(val),
  'Please provide a valid price with a minimum of 1.'
);

Validator.registerAsync('exist', function(value, attribute, req, passes) {
  if (!attribute)
    throw new Error('Specify Requirements i.e. fieldName: exist:Model, column');

  const attArr = attribute.split(',');
  if (attArr.length !== 2)
    throw new Error(`Invalid format for validation rule on ${attribute}`);

  const { 0: Model, 1: column } = attArr;

  const msg =
    column === 'username'
      ? `${capitalize(column)} has already been taken.`
      : `${capitalize(column)} already in use.`;

  Models[Model].valueExists({ [column]: value }).then(result => {
    if (result) {
      passes(false, msg);
      return;
    }
    passes();
  });
});

module.exports = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};
