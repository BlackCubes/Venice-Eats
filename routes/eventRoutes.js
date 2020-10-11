const express = require('express');
const authController = require('./../controllers/authController');
const eventController = require('./../controllers/eventController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllVeniceEvents)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.validateEvent,
    eventController.createVeniceEvent
  );

router
  .route('/:id')
  .get(eventController.getVeniceEvent)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.validateEvent,
    eventController.updateVeniceEvent
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    eventController.deleteVeniceEvent
  );

module.exports = router;
