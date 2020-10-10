const Validator = require('validatorjs');
const Models = require('./../models');
const capitalize = require('./capitalize');

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
