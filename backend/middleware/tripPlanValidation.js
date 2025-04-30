const validateTripPlan = (req, res, next) => {
  const { title, destination, startDate, endDate, budget } = req.body;

  const errors = [];

  // Basic required field validation
  if (!title) errors.push('Title is required');
  if (!destination?.city) errors.push('Destination city is required');
  if (!destination?.country) errors.push('Destination country is required');
  if (!startDate) errors.push('Start date is required');
  if (!endDate) errors.push('End date is required');
  if (!budget?.total) errors.push('Total budget is required');

  // Date validation
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  if (start < today) errors.push('Start date cannot be in the past');
  if (end < start) errors.push('End date must be after start date');

  // Budget validation
  if (budget?.total && budget.total <= 0) {
    errors.push('Budget must be greater than 0');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

const validateActivity = (req, res, next) => {
  const { day, places } = req.body;

  const errors = [];

  if (!day) errors.push('Day number is required');
  if (!Array.isArray(places)) errors.push('Places must be an array');

  if (places) {
    places.forEach((place, index) => {
      if (!place.name) errors.push(`Place ${index + 1}: Name is required`);
      if (!place.type) errors.push(`Place ${index + 1}: Type is required`);
      if (place.cost && place.cost < 0) errors.push(`Place ${index + 1}: Cost cannot be negative`);
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

const validateAccommodation = (req, res, next) => {
  const { hotelName, checkIn, checkOut, price } = req.body;

  const errors = [];

  if (!hotelName) errors.push('Hotel name is required');
  if (!checkIn) errors.push('Check-in date is required');
  if (!checkOut) errors.push('Check-out date is required');
  if (price && price < 0) errors.push('Price cannot be negative');

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate < checkInDate) {
    errors.push('Check-out date must be after check-in date');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

const validateTransportation = (req, res, next) => {
  const { arrival, departure, localTransport } = req.body;

  const errors = [];

  // Validate arrival
  if (arrival) {
    if (!arrival.mode) errors.push('Arrival mode is required');
    if (arrival.cost && arrival.cost < 0) errors.push('Arrival cost cannot be negative');
  }

  // Validate departure
  if (departure) {
    if (!departure.mode) errors.push('Departure mode is required');
    if (departure.cost && departure.cost < 0) errors.push('Departure cost cannot be negative');
  }

  // Validate local transport
  if (localTransport && Array.isArray(localTransport)) {
    localTransport.forEach((transport, index) => {
      if (!transport.type) errors.push(`Local transport ${index + 1}: Type is required`);
      if (transport.cost && transport.cost < 0) errors.push(`Local transport ${index + 1}: Cost cannot be negative`);
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

module.exports = {
  validateTripPlan,
  validateActivity,
  validateAccommodation,
  validateTransportation
}; 