const TripPlan = require('../models/TripPlan');

// Common database queries for Trip Planner

// 1. Find trips by user
const getUserTrips = async (userId) => {
  try {
    return await TripPlan.find({ userId })
      .sort({ startDate: 1 })
      .select('title destination startDate endDate status');
  } catch (error) {
    console.error('Error fetching user trips:', error);
    throw error;
  }
};

// 2. Find upcoming trips
const getUpcomingTrips = async (userId) => {
  try {
    const today = new Date();
    return await TripPlan.find({
      userId,
      startDate: { $gte: today },
      status: { $nin: ['cancelled', 'completed'] }
    }).sort({ startDate: 1 });
  } catch (error) {
    console.error('Error fetching upcoming trips:', error);
    throw error;
  }
};

// 3. Find trips by destination
const getTripsByDestination = async (city, country) => {
  try {
    return await TripPlan.find({
      'destination.city': new RegExp(city, 'i'),
      'destination.country': new RegExp(country, 'i')
    });
  } catch (error) {
    console.error('Error fetching trips by destination:', error);
    throw error;
  }
};

// 4. Find trips within budget range
const getTripsByBudget = async (minBudget, maxBudget) => {
  try {
    return await TripPlan.find({
      'budget.total': { $gte: minBudget, $lte: maxBudget }
    }).sort({ 'budget.total': 1 });
  } catch (error) {
    console.error('Error fetching trips by budget:', error);
    throw error;
  }
};

// 5. Find trips by date range
const getTripsByDateRange = async (startDate, endDate) => {
  try {
    return await TripPlan.find({
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) }
    }).sort({ startDate: 1 });
  } catch (error) {
    console.error('Error fetching trips by date range:', error);
    throw error;
  }
};

// 6. Get trip statistics
const getTripStats = async (tripId) => {
  try {
    const trip = await TripPlan.findById(tripId);
    if (!trip) return null;

    const totalActivities = trip.activities.reduce((sum, day) => sum + day.places.length, 0);
    const totalCost = trip.budget.spent;
    const daysUntilTrip = Math.ceil((new Date(trip.startDate) - new Date()) / (1000 * 60 * 60 * 24));

    return {
      totalActivities,
      totalCost,
      daysUntilTrip,
      duration: trip.duration,
      budgetRemaining: trip.budget.remaining
    };
  } catch (error) {
    console.error('Error fetching trip statistics:', error);
    throw error;
  }
};

// 7. Get daily activities
const getDailyActivities = async (tripId, day) => {
  try {
    const trip = await TripPlan.findOne(
      { _id: tripId, 'activities.day': day },
      { 'activities.$': 1 }
    );
    return trip?.activities[0] || null;
  } catch (error) {
    console.error('Error fetching daily activities:', error);
    throw error;
  }
};

// 8. Update trip status
const updateTripStatus = async (tripId, newStatus) => {
  try {
    return await TripPlan.findByIdAndUpdate(
      tripId,
      { status: newStatus },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating trip status:', error);
    throw error;
  }
};

// 9. Add activity to trip
const addActivity = async (tripId, dayNumber, activity) => {
  try {
    const trip = await TripPlan.findById(tripId);
    if (!trip) return null;

    let dayPlan = trip.activities.find(d => d.day === dayNumber);
    if (!dayPlan) {
      dayPlan = {
        day: dayNumber,
        date: new Date(trip.startDate.getTime() + (dayNumber - 1) * 24 * 60 * 60 * 1000),
        places: []
      };
      trip.activities.push(dayPlan);
    }

    dayPlan.places.push(activity);
    await trip.save();
    return trip;
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};

// 10. Update budget
const updateBudget = async (tripId, expenses) => {
  try {
    const trip = await TripPlan.findById(tripId);
    if (!trip) return null;

    trip.budget.spent += expenses;
    trip.budget.remaining = trip.budget.total - trip.budget.spent;
    
    return await trip.save();
  } catch (error) {
    console.error('Error updating budget:', error);
    throw error;
  }
};

// Example usage in MongoDB Shell:
/*
// Find all trips for a user
db.tripplans.find({ userId: ObjectId("user_id_here") })

// Find upcoming trips
db.tripplans.find({
  startDate: { $gte: new Date() },
  status: { $nin: ['cancelled', 'completed'] }
})

// Find trips by destination
db.tripplans.find({
  "destination.city": "Paris",
  "destination.country": "France"
})

// Find trips within budget range
db.tripplans.find({
  "budget.total": { $gte: 1000, $lte: 5000 }
})

// Find trips with specific activities
db.tripplans.find({
  "activities.places.type": "attraction"
})

// Update trip status
db.tripplans.updateOne(
  { _id: ObjectId("trip_id_here") },
  { $set: { status: "completed" } }
)

// Add new activity
db.tripplans.updateOne(
  { _id: ObjectId("trip_id_here") },
  {
    $push: {
      "activities.$.places": {
        name: "Eiffel Tower",
        type: "attraction",
        time: "10:00"
      }
    }
  }
)

// Update budget
db.tripplans.updateOne(
  { _id: ObjectId("trip_id_here") },
  {
    $inc: {
      "budget.spent": 100,
      "budget.remaining": -100
    }
  }
)
*/

module.exports = {
  getUserTrips,
  getUpcomingTrips,
  getTripsByDestination,
  getTripsByBudget,
  getTripsByDateRange,
  getTripStats,
  getDailyActivities,
  updateTripStatus,
  addActivity,
  updateBudget
}; 