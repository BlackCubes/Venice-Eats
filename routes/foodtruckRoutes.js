const express = require('express');
const authController = require('./../controllers/authController');
const foodtruckController = require('./../controllers/foodtruckController');
const photoController = require('./../controllers/photoController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router
  .route('/')
  .get(foodtruckController.getAllFoodtrucks)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    photoController.bufferArray,
    // validationController.validateFoodtruck,
    photoController.uploadArrayPhotos,
    foodtruckController.createFoodtruck
  );

router
  .route('/:id')
  .get(foodtruckController.getFoodtruck)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.validateFoodtruck,
    foodtruckController.updateFoodtruck
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    foodtruckController.deleteFoodtruck
  );

module.exports = router;
