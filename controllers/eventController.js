const factory = require('./handlerFactory');

exports.createVeniceEvent = factory.createOne('VeniceEvents');
exports.getVeniceEvent = factory.getOne('VeniceEvents');
exports.getAllVeniceEvents = factory.getAll('VeniceEvents');
exports.updateVeniceEvent = factory.updateOne('VeniceEvents');
exports.deleteVeniceEvent = factory.deleteOne('VeniceEvents');
