const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['info', 'debug', 'warn', 'error', 'fatal'],
    default: 'info',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  meta: {
    type: Object,
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
