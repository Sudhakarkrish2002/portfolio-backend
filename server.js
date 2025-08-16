const express = require('express');
require('dotenv').config();

// Import configurations and middleware
const connectDB = require('./config/db');
const corsMiddleware = require('./middleware/cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Import routes
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use('*', notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    if (process.env.SKIP_DB === 'true') {
      console.log('⚠️  Skipping MongoDB connection (SKIP_DB=true)');
    } else {
      await connectDB();
    }
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📧 Email: ${process.env.EMAIL_USER || 'not-set'}`);
      console.log(`🗄️  Database URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'} (skip=${process.env.SKIP_DB === 'true'})`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer(); 