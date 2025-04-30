const TripPlan = require('../models/TripPlan');

// 1. Get Custom Trip Plans
const getCustomTrips = async (userId) => {
  try {
    return await TripPlan.find({ 
      userId,
      type: 'custom'  // For custom-created trips
    })
    .sort({ createdAt: -1 })
    .select('title destination startDate endDate status budget');
  } catch (error) {
    console.error('Error fetching custom trips:', error);
    throw error;
  }
};

// 2. Get Popular Destinations
const getPopularDestinations = async () => {
  try {
    return await TripPlan.aggregate([
      {
        $group: {
          _id: '$destination.city',
          country: { $first: '$destination.country' },
          count: { $sum: 1 },
          avgBudget: { $avg: '$budget.total' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    throw error;
  }
};

// 3. Get Trip Details with Activities
const getTripWithActivities = async (tripId) => {
  try {
    const trip = await TripPlan.findById(tripId)
      .populate('userId', 'name email')
      .select('-__v');
    
    if (!trip) return null;

    // Calculate additional trip metrics
    const totalActivities = trip.activities.reduce((sum, day) => sum + day.places.length, 0);
    const totalDays = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24));
    
    return {
      ...trip.toObject(),
      metrics: {
        totalActivities,
        totalDays,
        averageActivitiesPerDay: totalActivities / totalDays,
        budgetPerDay: trip.budget.total / totalDays
      }
    };
  } catch (error) {
    console.error('Error fetching trip details:', error);
    throw error;
  }
};

// 4. Add or Update Day Plan
const updateDayPlan = async (tripId, dayNumber, activities) => {
  try {
    const trip = await TripPlan.findById(tripId);
    if (!trip) return null;

    // Find or create day plan
    let dayPlan = trip.activities.find(d => d.day === dayNumber);
    if (!dayPlan) {
      dayPlan = {
        day: dayNumber,
        date: new Date(trip.startDate.getTime() + (dayNumber - 1) * 24 * 60 * 60 * 1000),
        places: []
      };
      trip.activities.push(dayPlan);
    }

    // Update activities
    dayPlan.places = activities;

    // Recalculate day cost
    dayPlan.totalDayCost = activities.reduce((sum, activity) => sum + (activity.cost || 0), 0);

    // Update trip budget
    trip.budget.spent = trip.activities.reduce((sum, day) => sum + (day.totalDayCost || 0), 0);
    trip.budget.remaining = trip.budget.total - trip.budget.spent;

    await trip.save();
    return trip;
  } catch (error) {
    console.error('Error updating day plan:', error);
    throw error;
  }
};

// 5. Search Trips
const searchTrips = async (filters) => {
  try {
    const query = {};

    if (filters.destination) {
      query['destination.city'] = new RegExp(filters.destination, 'i');
    }

    if (filters.dateRange) {
      query.startDate = { $gte: new Date(filters.dateRange.start) };
      query.endDate = { $lte: new Date(filters.dateRange.end) };
    }

    if (filters.budget) {
      query['budget.total'] = { 
        $gte: filters.budget.min,
        $lte: filters.budget.max 
      };
    }

    if (filters.type) {
      query.type = filters.type;
    }

    return await TripPlan.find(query)
      .sort(filters.sort || { startDate: 1 })
      .limit(filters.limit || 10);
  } catch (error) {
    console.error('Error searching trips:', error);
    throw error;
  }
};

// 6. Get Trip Summary
const getTripSummary = async (tripId) => {
  try {
    const trip = await TripPlan.findById(tripId);
    if (!trip) return null;

    const activityTypes = trip.activities.reduce((acc, day) => {
      day.places.forEach(place => {
        acc[place.type] = (acc[place.type] || 0) + 1;
      });
      return acc;
    }, {});

    return {
      title: trip.title,
      destination: trip.destination,
      duration: {
        start: trip.startDate,
        end: trip.endDate,
        days: Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))
      },
      budget: {
        total: trip.budget.total,
        spent: trip.budget.spent,
        remaining: trip.budget.remaining,
        percentageUsed: ((trip.budget.spent / trip.budget.total) * 100).toFixed(2)
      },
      activitySummary: activityTypes,
      status: trip.status
    };
  } catch (error) {
    console.error('Error fetching trip summary:', error);
    throw error;
  }
};

module.exports = {
  getCustomTrips,
  getPopularDestinations,
  getTripWithActivities,
  updateDayPlan,
  searchTrips,
  getTripSummary
}; 