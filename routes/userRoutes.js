const express = require('express');

const router = express.Router();

const {
  deleteUser,
  updateMe,
  deleteMe,
  updateUser,
  getAllUsers,
  createUser,
  getMe,
  getUser,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  protect,
  restrictTo,
} = require('../controllers/authController');

//auth routes
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

//Protect all routes after this middleware
router.use(protect);

router.route('/updateMyPassword').patch(updatePassword);
router.route('/me').get(getMe, getUser);
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);

//user routes
router.use(restrictTo('admin'));
router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').delete(deleteUser).patch(updateUser).get(getUser);

module.exports = router;
