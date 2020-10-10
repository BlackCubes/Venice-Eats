const express = require('express');
const eventController = require('./../controllers/eventController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllVeniceEvents)
  .post(validationController.validateEvent, eventController.createVeniceEvent);

router
  .route('/:id')
  .get(eventController.getVeniceEvent)
  .patch(validationController.validateEvent, eventController.updateVeniceEvent)
  .delete(eventController.deleteVeniceEvent);

module.exports = router;
