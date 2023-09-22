const Tour = require('../models/tourModel');

const catchAsync = require('../utills/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', { tours });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', { title: 'Tour' });
};
