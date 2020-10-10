const foodtruckController = require('./../controllers/foodtruckController');

router.route('/').post(foodtruckController.createFoodtruck);

module.exports = router;
