const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['attraction', 'restaurant', 'hotel', 'activity', 'other'],
    required: true
  },
  time: String,
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  cost: {
    type: Number,
    default: 0
  },
  notes: String,
  duration: String,
  bookingInfo: {
    confirmation: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  }
});

const dayPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  date: Date,
  places: [placeSchema],
  notes: String,
  weatherInfo: {
    forecast: String,
    temperature: String
  },
  totalDayCost: {
    type: Number,
    default: 0
  }
});

const tripPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  budget: {
    total: {
      type: Number,
      required: true
    },
    spent: {
      type: Number,
      default: 0
    },
    remaining: {
      type: Number,
      default: function() {
        return this.budget.total - this.budget.spent;
      }
    }
  },
  travelers: [{
    name: String,
    age: Number,
    preferences: [String]
  }],
  accommodation: {
    hotelName: String,
    checkIn: Date,
    checkOut: Date,
    roomType: String,
    price: Number,
    address: String,
    bookingReference: String,
    amenities: [String],
    notes: String
  },
  transportation: {
    arrival: {
      mode: String,
      details: String,
      cost: Number,
      bookingReference: String,
      departureTime: Date,
      arrivalTime: Date
    },
    departure: {
      mode: String,
      details: String,
      cost: Number,
      bookingReference: String,
      departureTime: Date,
      arrivalTime: Date
    },
    localTransport: [{
      type: String,
      details: String,
      cost: Number
    }]
  },
  activities: [dayPlanSchema],
  documents: [{
    type: String,
    name: String,
    url: String,
    notes: String
  }],
  emergencyContacts: [{
    name: String,
    relationship: String,
    phone: String,
    email: String
  }],
  notes: String,
  status: {
    type: String,
    enum: ['draft', 'planned', 'ongoing', 'completed', 'cancelled'],
    default: 'draft'
  },
  preferences: {
    cuisine: [String],
    activities: [String],
    accessibility: [String]
  },
  weather: {
    forecast: [
      {
        date: Date,
        condition: String,
        temperature: String,
        precipitation: String
      }
    ]
  },
  sharedWith: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['view', 'edit'],
      default: 'view'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for trip duration
tripPlanSchema.virtual('duration').get(function() {
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to update budget
tripPlanSchema.pre('save', function(next) {
  let totalSpent = 0;
  
  // Add accommodation cost
  if (this.accommodation && this.accommodation.price) {
    totalSpent += this.accommodation.price;
  }
  
  // Add transportation costs
  if (this.transportation) {
    if (this.transportation.arrival && this.transportation.arrival.cost) {
      totalSpent += this.transportation.arrival.cost;
    }
    if (this.transportation.departure && this.transportation.departure.cost) {
      totalSpent += this.transportation.departure.cost;
    }
    if (this.transportation.localTransport) {
      this.transportation.localTransport.forEach(transport => {
        if (transport.cost) totalSpent += transport.cost;
      });
    }
  }
  
  // Add activity costs
  if (this.activities) {
    this.activities.forEach(day => {
      if (day.places) {
        day.places.forEach(place => {
          if (place.cost) totalSpent += place.cost;
        });
      }
      day.totalDayCost = day.places ? day.places.reduce((sum, place) => sum + (place.cost || 0), 0) : 0;
    });
  }
  
  this.budget.spent = totalSpent;
  this.budget.remaining = this.budget.total - totalSpent;
  
  next();
});

const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

module.exports = TripPlan; 