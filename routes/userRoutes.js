const express = require('express');
const authController = require('./../controllers/authController');
const validationController = require('./../controllers/validationController');

const router = express.Router();

router.post(
  '/signup',
  authController.checkLogin,
  validationController.signup,
  authController.signup
);
router.post(
  '/login',
  authController.checkLogin,
  validationController.login,
  authController.login
);
router.get(
  '/logout',
  authController.protect,
  authController.restrictTo('admin'),
  authController.logout
);

module.exports = router;
