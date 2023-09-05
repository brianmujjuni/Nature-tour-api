const Tour = require('../models/tourModel');

//function to get all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {},
  });
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(200).json({
      status: 'succes',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed to create tour',
      err: error,
    });
  }
};

exports.updateTour = (req, res) => {};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
