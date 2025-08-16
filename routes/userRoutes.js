const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  changePassword
} = require('../controllers/userController');

const router = express.Router();

// All routes require authentication (would need auth middleware)
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', changePassword);

module.exports = router;
