const Log = require('../models/Log');

// Create a new log entry
const createLog = async (req, res) => {
  try {
    const { sendEmailAlert, sendSlackAlert } = require('../services/alertService');
    const { level, message, source, timestamp, meta } = req.body;

    const newLog = new Log({
      level,
      message,
      source,
      timestamp: timestamp || new Date(),
      meta,
    });

    await newLog.save();

    await sendEmailAlert(newLog);
    await sendSlackAlert(newLog);

    return res.status(201).json({
      success: true,
      data: newLog,
    });
  } catch (error) {
    console.error('Error saving log:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// Retrieve logs with filters
const getLogs = async (req, res) => {
  try {
    const {
      level,
      source,
      startDate,
      endDate,
      limit = 50,
      skip = 0,
    } = req.query;

    const filter = {};

    if (level) filter.level = level;
    if (source) filter.source = source;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const total = await Log.countDocuments(filter);

    return res.json({
      success: true,
      total,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  createLog,
  getLogs,
};
