const express = require('express');

const router = express.Router();

const {
  deleteUser,
  updateMe,
  deleteMe,
  updateUser,
  getAllUsers,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,

  protect,
} = require('../controllers/authController');

//auth routes
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updateMyPassword').patch(protect, updatePassword);
router.route('/updateMe').patch(protect, updateMe);
router.route('/deleteMe').delete(protect, deleteMe);

//user routes
router.route('/:id').delete(deleteUser).patch(updateUser);
router.route('/').get(getAllUsers);

module.exports = router;
