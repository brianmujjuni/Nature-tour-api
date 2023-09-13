const User = require('../models/userModel');
const AppError = require('../utills/appError');

const catchAsync = require('../utills/catchAsync');

//check for fields to update
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.passwordConfirm) {
    return next(
      new AppError(
        'This route isnt for password updates.Please use updateMyPassword',
        400,
      ),
    );
  }
  //filter out unwanted fields not to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});
