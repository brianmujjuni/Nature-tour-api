const User = require('../models/userModel');

const catchAsync = require('../utills/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    msg: 'Route under development',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    msg: 'Route under development',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    msg: 'Route under development',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    msg: 'Route under development',
  });
};
