const express = require('express');
const geoController = require('./../controllers/geoController');

const router = express.Router();

router
  .route('/')
  .get(geoController.getAllGeos)
  .post(geoController.createGeo);

router
  .route('/:id')
  .get(geoController.getGeo)
  .patch(geoController.updateGeo)
  .delete(geoController.deleteGeo);

module.exports = router;
