const factory = require('./handlerFactory');

exports.createFoodtruck = factory.createOne('Foodtrucks');
exports.getFoodtruck = factory.getOne('Foodtrucks', 'veniceevents');
exports.getAllFoodtrucks = factory.getAll('Foodtrucks');
exports.updateFoodtruck = factory.updateOne('Foodtrucks');
exports.deleteFoodtruck = factory.deleteOne('Foodtrucks');
