const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register new user
router.post('/register', authController.register);
router.post('/signup', authController.register);

// Login
router.post('/login', authController.login);

// Get all users (for testing)
router.get('/users', authController.getAllUsers);

module.exports = router; 