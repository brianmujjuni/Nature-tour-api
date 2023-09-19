const User = require('../models/userModel');
const AppError = require('../utills/appError');
const catchAsync = require('../utills/catchAsync');
const { deleteOne, updateOne } = require('./HandlerFactory');

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

exports.createUser = (req, res, next) => {
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

//Do not update password with this
exports.updateUser = updateOne(User);

exports.deleteUser = deleteOne(User);

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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
