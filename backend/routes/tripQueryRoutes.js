const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCustomTrips,
  getPopularDestinations,
  getTripWithActivities,
  updateDayPlan,
  searchTrips,
  getTripSummary
} = require('../utils/tripQueries');

// Get user's custom trips
router.get('/custom', auth, async (req, res) => {
  try {
    const trips = await getCustomTrips(req.user.id);
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom trips', error: error.message });
  }
});

// Get popular destinations
router.get('/popular-destinations', async (req, res) => {
  try {
    const destinations = await getPopularDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular destinations', error: error.message });
  }
});

// Get detailed trip information
router.get('/:tripId/details', auth, async (req, res) => {
  try {
    const trip = await getTripWithActivities(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip details', error: error.message });
  }
});

// Update day plan
router.put('/:tripId/day/:dayNumber', auth, async (req, res) => {
  try {
    const { tripId, dayNumber } = req.params;
    const { activities } = req.body;

    const updatedTrip = await updateDayPlan(tripId, parseInt(dayNumber), activities);
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating day plan', error: error.message });
  }
});

// Search trips
router.get('/search', async (req, res) => {
  try {
    const filters = {
      destination: req.query.destination,
      dateRange: req.query.dateRange ? JSON.parse(req.query.dateRange) : null,
      budget: req.query.budget ? JSON.parse(req.query.budget) : null,
      type: req.query.type,
      sort: req.query.sort ? JSON.parse(req.query.sort) : null,
      limit: parseInt(req.query.limit) || 10
    };

    const trips = await searchTrips(filters);
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error searching trips', error: error.message });
  }
});

// Get trip summary
router.get('/:tripId/summary', auth, async (req, res) => {
  try {
    const summary = await getTripSummary(req.params.tripId);
    if (!summary) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip summary', error: error.message });
  }
});

module.exports = router; 