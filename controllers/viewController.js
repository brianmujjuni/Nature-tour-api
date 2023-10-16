const Tour = require('../models/tourModel');
const AppError = require('../utills/appError');

const catchAsync = require('../utills/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', { tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  res.status(200).render('tour', { tour });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', { title: 'Lg into your account' });
});
