require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authController = require('./controllers/authController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with detailed error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password in logs
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error details:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.name === 'MongoServerError') {
      if (error.code === 18) {
        console.error('Authentication failed - check username and password');
      } else if (error.code === 8000) {
        console.error('Wrong database name in connection string');
      } else if (error.code === 13) {
        console.error('Authentication failed - make sure user has correct permissions');
      }
    } else if (error.name === 'MongoNetworkError') {
      console.error('Network error - check your internet connection and MongoDB Atlas status');
      console.error('Also verify that your IP address is whitelisted in MongoDB Atlas');
    } else if (error.name === 'MongooseServerSelectionError') {
      console.error('Could not connect to any servers in your MongoDB Atlas cluster');
      console.error('Check that your cluster is running and the connection string is correct');
    }
    
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected - checking connection...');
  connectDB();
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

// Direct routes for compatibility
app.post('/signup', authController.register);
app.post('/login', authController.login);

// API routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 