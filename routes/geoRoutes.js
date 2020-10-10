const express = require('express');
const geoController = require('./../controllers/geoController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router
  .route('/')
  .get(geoController.getAllGeos)
  .post(validationController.validateGeo, geoController.createGeo);

router
  .route('/:id')
  .get(geoController.getGeo)
  .patch(validationController.validateGeo, geoController.updateGeo)
  .delete(geoController.deleteGeo);

module.exports = router;
