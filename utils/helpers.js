// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input helper
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Generate random ID helper
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Format date helper
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Error response helper
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

// Success response helper
const successResponse = (res, data, message = 'Success') => {
  return res.status(200).json({
    success: true,
    data,
    message
  });
};

module.exports = {
  isValidEmail,
  sanitizeInput,
  generateId,
  formatDate,
  errorResponse,
  successResponse
};
