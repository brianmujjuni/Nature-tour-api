const express = require('express')
const {getAllTours,createTour,getTour,deleteTour,updateTour,checkBody} = require('../controllers/tourController')
const router = express.Router()


router.route('/').get(getAllTours).post(checkBody,createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)


module.exports = router