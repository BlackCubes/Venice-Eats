const express = require('express');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllVeniceEvents)
  .post(eventController.createVeniceEvent);

router
  .route('/:id')
  .get(eventController.getVeniceEvent)
  .patch(eventController.updateVeniceEvent)
  .delete(eventController.deleteVeniceEvent);

module.exports = router;
