const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
  submitMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/messageController');

// Public route for submitting messages
router.post('/submit', submitMessage);

// Admin routes - protected
router.get('/all', auth, isAdmin, getAllMessages);
router.patch('/:id/status', auth, isAdmin, updateMessageStatus);
router.delete('/:id', auth, isAdmin, deleteMessage);

module.exports = router; 