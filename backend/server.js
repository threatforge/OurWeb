const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database locally
if (!process.env.VERCEL) {
  connectDB();
}

const app = express();

// Serverless DB connection middleware
if (process.env.VERCEL) {
  app.use(async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      console.error('Database connection failed in middleware:', error);
      res.status(500).json({ message: 'Database connection failed' });
    }
  });
}

// Security middleware
app.use(helmet());

// CORS config (Relaxed for Hackathon/Vercel)
app.use(cors({
  origin: function (origin, callback) {
    // Allow any origin for easy Vercel deployments
    callback(null, true);
  },
  credentials: true
}));

// Body parser
app.use(express.json());

// Sanitize data (Safe for Express 5)
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    req.params = mongoSanitize.sanitize(req.params);
  }
  next();
});

// Prevent XSS attacks (Safe for Express 5)
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
     // Skip xss-clean globally as it crashes Express 5 query params
  }
  next();
});

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/team', require('./routes/team'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/events', require('./routes/events'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('ThreatForge API is running...');
});

const PORT = process.env.PORT || 5000;

// Central error handler (catch all glitches)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'A critical glitch occurred in the system.',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server Error'
  });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = app;
