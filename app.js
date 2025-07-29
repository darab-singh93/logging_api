const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const logRoutes = require('./routes/logRoutes');
const limiter = require('./middlewares/rateLimit');
const apiKeyAuth = require('./middlewares/apiKeyAuth');


const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(limiter); // ✅ Still keep rate-limiter

// Routes
app.use('/logs', apiKeyAuth, logRoutes);

app.get('/', (req, res) => {
  res.send('🔐 Secure Logging API is live');
});

module.exports = app;
