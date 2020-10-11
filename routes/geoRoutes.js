const express = require('express');
const authController = require('./../controllers/authController');
const geoController = require('./../controllers/geoController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router
  .route('/')
  .get(geoController.getAllGeos)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.validateGeo,
    geoController.createGeo
  );

router
  .route('/:id')
  .get(geoController.getGeo)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.validateGeo,
    geoController.updateGeo
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    geoController.deleteGeo
  );

module.exports = router;
