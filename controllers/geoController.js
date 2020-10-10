const factory = require('./handlerFactory');

exports.createGeo = factory.createOne('Geos');
exports.getGeo = factory.getOne('Geos', 'foodtrucks');
exports.getAllGeos = factory.getAll('Geos');
exports.updateGeo = factory.updateOne('Geos');
exports.deleteGeo = factory.deleteOne('Geos');
