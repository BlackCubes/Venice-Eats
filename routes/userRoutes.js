const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
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

router.get(
  '/me',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getMe,
  userController.getUser
);

router;
route('/').get(
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers
);

module.exports = router;
