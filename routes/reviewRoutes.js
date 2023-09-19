const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

router
  .route('/:id')
  .delete(protect, restrictTo('user'), deleteReview)
  .patch(protect, restrictTo('user'), updateReview);

module.exports = router;
