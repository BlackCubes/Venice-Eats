const express = require('express');
const foodtruckController = require('./../controllers/foodtruckController');

const router = express.Router();

router.route('/').post(foodtruckController.createFoodtruck);

module.exports = router;
