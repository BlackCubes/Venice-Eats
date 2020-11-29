const factory = require('./handlerFactory');

exports.createUser = factory.createOne('Users');
exports.getAllUsers = factory.getAll('Users');
exports.getUser = factory.getOne('Users');

exports.getMe = (req, res, next) => {
  req.params.id = [req.user.id];
  next();
};
