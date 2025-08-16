const Contact = require('../models/Contact');
const { sendEmail, createContactEmailTemplate } = require('../utils/emailService');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required' 
      });
    }

    if (name.length > 50) {
      return res.status(400).json({ 
        success: false,
        error: 'Name cannot exceed 50 characters' 
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({ 
        success: false,
        error: 'Message cannot exceed 1000 characters' 
      });
    }

    // Create contact record
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send email notification
    const mailOptions = createContactEmailTemplate(
      name, 
      email, 
      message, 
      req.ip || req.connection.remoteAddress
    );

    const emailResult = await sendEmail(mailOptions);

    if (!emailResult.success) {
      console.error('Email not sent:', emailResult.error);
    }

    res.status(200).json({ 
      success: true,
      message: 'Message stored successfully',
      emailSent: emailResult.success,
      emailError: emailResult.success ? undefined : emailResult.error,
      contactId: contact._id
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        error: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to send message. Please try again.' 
    });
  }
};

// Get all contacts (for admin purposes)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(100);
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('❌ Get contacts error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch contacts' 
    });
  }
};

// Get contact statistics
const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    const thisWeekContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      stats: {
        total: totalContacts,
        today: todayContacts,
        thisWeek: thisWeekContacts
      }
    });
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch statistics' 
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactStats
};
