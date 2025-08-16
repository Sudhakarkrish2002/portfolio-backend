const express = require('express');
const router = express.Router();
const { 
  submitContact, 
  getAllContacts, 
  getContactStats 
} = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/', submitContact);

// GET /api/contact - Get all contacts (for admin)
router.get('/', getAllContacts);

// GET /api/contact/stats - Get contact statistics
router.get('/stats', getContactStats);

module.exports = router;
