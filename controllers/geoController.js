const factory = require('./handlerFactory');

exports.createGeo = factory.createOne('Geo');
exports.getGeo = factory.getOne('Geo', 'foodtrucks');
exports.getAllGeos = factory.getAll('Geo');
exports.updateGeo = factory.updateOne('Geo');
exports.deleteGeo = factory.deleteOne('Geo');
