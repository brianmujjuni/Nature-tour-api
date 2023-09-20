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

  protect,
  restrictTo,
} = require('../controllers/authController');

//auth routes
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updateMyPassword').patch(protect, updatePassword);

//protect all the routes with this middleware
router.use(protect);

router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/me').get(getMe, getUser);

//user routes
router.use(restrictTo('admin'));
router.route('/:id').delete(deleteUser).patch(updateUser);
router.route('/').post(createUser).get(getAllUsers);

module.exports = router;
