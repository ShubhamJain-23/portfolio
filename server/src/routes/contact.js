import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create new contact
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Contact message received successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to save contact message',
      error: error.message,
    });
  }
});

// GET - Get all contact messages (optional, for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
});

export default router;
