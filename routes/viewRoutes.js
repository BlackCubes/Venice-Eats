const express = require('express');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get(
  '/',
  // , For isLoggedIn
  viewController.getHome
);

module.exports = router;
