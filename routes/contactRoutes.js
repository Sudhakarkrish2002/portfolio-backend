const express = require('express');
const router = express.Router();
const { 
  submitContact, 
  getAllContacts, 
  getContactStats 
} = require('../controllers/contactController');
const { sendEmail } = require('../utils/emailService');

// POST /api/contact - Submit contact form
router.post('/', submitContact);

// GET /api/contact - Get all contacts (for admin)
router.get('/', getAllContacts);

// GET /api/contact/stats - Get contact statistics
router.get('/stats', getContactStats);

// GET /api/contact/test-email - Send a test email (dev only)
router.get('/test-email', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Not allowed in production' });
  }
  try {
    const result = await sendEmail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test email from Portfolio API',
      text: 'This is a test email to verify SMTP configuration.'
    });
    res.json({ success: result.success, info: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
