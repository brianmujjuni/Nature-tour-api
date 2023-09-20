const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'leade-guide'), getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'leade-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'leade-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

module.exports = router;
