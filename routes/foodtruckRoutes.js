const express = require('express');
const foodtruckController = require('./../controllers/foodtruckController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router
  .route('/')
  .get(foodtruckController.getAllFoodtrucks)
  .post(
    validationController.createFoodtruck,
    foodtruckController.createFoodtruck
  );

router
  .route('/:id')
  .get(foodtruckController.getFoodtruck)
  .patch(foodtruckController.updateFoodtruck)
  .delete(foodtruckController.deleteFoodtruck);

module.exports = router;
