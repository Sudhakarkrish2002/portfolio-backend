const express = require('express');
const router = express.Router();

// Import route modules
const contactRoutes = require('./contactRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

// API routes
router.use('/contact', contactRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: 'connected', // This will be updated dynamically
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
router.get('/', (req, res) => {
  res.json({ 
    message: 'Sudhakar N Portfolio API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
