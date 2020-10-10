const express = require('express');
const foodtruckController = require('./../controllers/foodtruckController');

const router = express.Router();

router
  .route('/')
  .get(foodtruckController.getAllFoodtrucks)
  .post(foodtruckController.createFoodtruck);

router
  .route('/:id')
  .get(foodtruckController.getFoodtruck)
  .patch(foodtruckController.updateFoodtruck)
  .delete(foodtruckController.deleteFoodtruck);

module.exports = router;
