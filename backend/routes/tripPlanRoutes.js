const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  validateTripPlan,
  validateActivity,
  validateAccommodation,
  validateTransportation
} = require('../middleware/tripPlanValidation');
const {
  createTripPlan,
  getUserTripPlans,
  getTripPlan,
  updateTripPlan,
  deleteTripPlan,
  getTripItinerary,
  getTripStats,
  addActivity,
  updateAccommodation,
  updateTransportation,
  shareTripPlan,
  getSharedTrips
} = require('../controllers/tripPlanController');

// All routes are protected
router.use(protect);

// Create and get all trip plans
router.route('/')
  .post(validateTripPlan, createTripPlan)
  .get(getUserTripPlans);

// Get shared trips
router.get('/shared', getSharedTrips);

// Get, update and delete specific trip plan
router.route('/:id')
  .get(getTripPlan)
  .put(validateTripPlan, updateTripPlan)
  .delete(deleteTripPlan);

// Get trip itinerary
router.get('/:id/itinerary', getTripItinerary);

// Get trip statistics
router.get('/:id/stats', getTripStats);

// Manage activities
router.post('/:id/activities', validateActivity, addActivity);

// Manage accommodation
router.put('/:id/accommodation', validateAccommodation, updateAccommodation);

// Manage transportation
router.put('/:id/transportation', validateTransportation, updateTransportation);

// Share trip plan
router.post('/:id/share', shareTripPlan);

module.exports = router; 