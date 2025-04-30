const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send auto-reply email
const sendAutoReply = async (userEmail, userName) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Thank you for contacting Journey Junction',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${userName},</h2>
          <p>Thank you for reaching out to Journey Junction! We've received your message and will get back to you as soon as possible.</p>
          <p>Our team typically responds within 24-48 hours during business days.</p>
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Explore our destinations</li>
            <li>Check out our trip planning tools</li>
            <li>Read travel guides and tips</li>
          </ul>
          <p>Best regards,<br>The Journey Junction Team</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending auto-reply:', error);
  }
};

// Send notification to admin
const notifyAdmin = async (messageDetails) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Message Received</h2>
          <p><strong>From:</strong> ${messageDetails.name} (${messageDetails.email})</p>
          <p><strong>Subject:</strong> ${messageDetails.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${messageDetails.message}</p>
          <p><em>Received at: ${new Date().toLocaleString()}</em></p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};

// Submit a new message
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new message
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    // Send auto-reply to user
    await sendAutoReply(email, name);

    // Notify admin
    await notifyAdmin({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: newMessage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// Get all messages (admin only)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving messages',
      error: error.message
    });
  }
};

// Update message status (admin only)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating message status',
      error: error.message
    });
  }
};

// Delete a message (admin only)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
}; 