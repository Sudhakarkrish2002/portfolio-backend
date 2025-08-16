// 404 handler
const notFound = (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found' 
  });
};

// Global error handler
const errorHandler = (error, req, res, next) => {
  console.error('❌ Global error:', error);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error' 
  });
};

module.exports = {
  notFound,
  errorHandler
};
