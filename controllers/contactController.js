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

    // Send email notification
    const mailOptions = createContactEmailTemplate(
      name.trim(), 
      email.trim().toLowerCase(), 
      message.trim(), 
      req.ip || req.connection.remoteAddress
    );

    const emailResult = await sendEmail(mailOptions);

    if (emailResult.success) {
      res.status(200).json({ 
        success: true,
        message: 'Message sent successfully!',
        emailSent: true
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: 'Failed to send email. Please try again.' 
      });
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to send message. Please try again.' 
    });
  }
};

module.exports = {
  submitContact
};
