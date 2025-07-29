const express = require('express');
const router = express.Router();
const { createLog, getLogs } = require('../controllers/logController');
const { validateLog } = require('../middlewares/validation');

// POST /logs with validation
router.post('/', validateLog, createLog);

// GET /logs
router.get('/', getLogs);

module.exports = router;
