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

    res.status(200).json({ 
      success: true,
      message: 'Message sent successfully!',
      emailSent: emailResult.success,
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

module.exports = {
  submitContact
};
