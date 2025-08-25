const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://portfolio-eight-inky-11.vercel.app',
    'https://portfolio-five-iota-w8s2nm20s1.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
