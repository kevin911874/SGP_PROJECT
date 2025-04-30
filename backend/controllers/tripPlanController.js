const TripPlan = require('../models/TripPlan');

// Create a new trip plan
exports.createTripPlan = async (req, res) => {
  try {
    const tripPlan = new TripPlan({
      ...req.body,
      userId: req.user._id // Assuming you have user info from auth middleware
    });
    await tripPlan.save();
    res.status(201).json({
      success: true,
      data: tripPlan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all trip plans for a user
exports.getUserTripPlans = async (req, res) => {
  try {
    const tripPlans = await TripPlan.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: tripPlans
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single trip plan
exports.getTripPlan = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tripPlan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a trip plan
exports.updateTripPlan = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tripPlan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a trip plan
exports.deleteTripPlan = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get trip itinerary
exports.getTripItinerary = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    // Format the itinerary data
    const itinerary = {
      tripInfo: {
        title: tripPlan.title,
        destination: tripPlan.destination,
        duration: {
          startDate: tripPlan.startDate,
          endDate: tripPlan.endDate,
          days: Math.ceil((new Date(tripPlan.endDate) - new Date(tripPlan.startDate)) / (1000 * 60 * 60 * 24))
        },
        budget: tripPlan.budget,
        status: tripPlan.status
      },
      accommodation: tripPlan.accommodation,
      transportation: tripPlan.transportation,
      dailyActivities: tripPlan.activities.sort((a, b) => a.day - b.day).map(day => ({
        day: day.day,
        date: new Date(new Date(tripPlan.startDate).getTime() + (day.day - 1) * 24 * 60 * 60 * 1000),
        places: day.places.map(place => ({
          ...place,
          timeFormatted: place.time ? new Date(`1970-01-01T${place.time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }) : null
        }))
      })),
      notes: tripPlan.notes,
      totalCost: (tripPlan.budget + 
        (tripPlan.accommodation?.price || 0) + 
        (tripPlan.transportation?.cost || 0))
    };

    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get trip statistics
exports.getTripStats = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    // Calculate statistics
    const stats = {
      tripDuration: tripPlan.duration,
      budgetStats: {
        total: tripPlan.budget.total,
        spent: tripPlan.budget.spent,
        remaining: tripPlan.budget.remaining,
        spentPercentage: ((tripPlan.budget.spent / tripPlan.budget.total) * 100).toFixed(2)
      },
      activitiesStats: {
        totalActivities: tripPlan.activities.reduce((sum, day) => sum + day.places.length, 0),
        activitiesByType: tripPlan.activities.reduce((types, day) => {
          day.places.forEach(place => {
            types[place.type] = (types[place.type] || 0) + 1;
          });
          return types;
        }, {}),
        costByDay: tripPlan.activities.map(day => ({
          day: day.day,
          date: day.date,
          totalCost: day.totalDayCost
        }))
      },
      transportationStats: {
        totalCost: (
          (tripPlan.transportation.arrival?.cost || 0) +
          (tripPlan.transportation.departure?.cost || 0) +
          tripPlan.transportation.localTransport.reduce((sum, transport) => sum + (transport.cost || 0), 0)
        ),
        modes: [
          ...(tripPlan.transportation.arrival ? [tripPlan.transportation.arrival.mode] : []),
          ...(tripPlan.transportation.departure ? [tripPlan.transportation.departure.mode] : []),
          ...tripPlan.transportation.localTransport.map(t => t.type)
        ]
      },
      accommodationStats: {
        nights: Math.ceil((new Date(tripPlan.accommodation.checkOut) - new Date(tripPlan.accommodation.checkIn)) / (1000 * 60 * 60 * 24)),
        costPerNight: tripPlan.accommodation.price ? 
          (tripPlan.accommodation.price / Math.ceil((new Date(tripPlan.accommodation.checkOut) - new Date(tripPlan.accommodation.checkIn)) / (1000 * 60 * 60 * 24))).toFixed(2) : 0,
        amenities: tripPlan.accommodation.amenities || []
      },
      completion: {
        documentsUploaded: tripPlan.documents.length,
        emergencyContactsAdded: tripPlan.emergencyContacts.length,
        weatherInfoAvailable: tripPlan.weather.forecast.length > 0,
        bookingStatus: {
          confirmed: tripPlan.activities.reduce((sum, day) => 
            sum + day.places.filter(place => place.bookingInfo?.status === 'confirmed').length, 0),
          pending: tripPlan.activities.reduce((sum, day) => 
            sum + day.places.filter(place => place.bookingInfo?.status === 'pending').length, 0),
          cancelled: tripPlan.activities.reduce((sum, day) => 
            sum + day.places.filter(place => place.bookingInfo?.status === 'cancelled').length, 0)
        }
      }
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add activity to a day
exports.addActivity = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    const { day, places } = req.body;
    
    // Find existing day or create new one
    let dayPlan = tripPlan.activities.find(d => d.day === day);
    if (!dayPlan) {
      dayPlan = {
        day,
        date: new Date(new Date(tripPlan.startDate).getTime() + (day - 1) * 24 * 60 * 60 * 1000),
        places: []
      };
      tripPlan.activities.push(dayPlan);
    }

    // Add new places to the day
    dayPlan.places.push(...places);

    // Sort activities by day
    tripPlan.activities.sort((a, b) => a.day - b.day);

    await tripPlan.save();

    res.status(200).json({
      success: true,
      data: tripPlan.activities
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update accommodation
exports.updateAccommodation = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    tripPlan.accommodation = {
      ...tripPlan.accommodation,
      ...req.body
    };

    await tripPlan.save();

    res.status(200).json({
      success: true,
      data: tripPlan.accommodation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update transportation
exports.updateTransportation = async (req, res) => {
  try {
    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    tripPlan.transportation = {
      ...tripPlan.transportation,
      ...req.body
    };

    await tripPlan.save();

    res.status(200).json({
      success: true,
      data: tripPlan.transportation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Share trip plan
exports.shareTripPlan = async (req, res) => {
  try {
    const { userId, permission } = req.body;

    const tripPlan = await TripPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        error: 'Trip plan not found'
      });
    }

    // Check if already shared with this user
    const existingShare = tripPlan.sharedWith.find(
      share => share.userId.toString() === userId
    );

    if (existingShare) {
      existingShare.permission = permission;
    } else {
      tripPlan.sharedWith.push({ userId, permission });
    }

    await tripPlan.save();

    res.status(200).json({
      success: true,
      data: tripPlan.sharedWith
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get shared trips
exports.getSharedTrips = async (req, res) => {
  try {
    const sharedTrips = await TripPlan.find({
      'sharedWith.userId': req.user._id
    });

    res.status(200).json({
      success: true,
      data: sharedTrips
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 