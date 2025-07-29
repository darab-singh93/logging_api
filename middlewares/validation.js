const { body, validationResult } = require('express-validator');

const validateLog = [
  body('level')
    .isIn(['info', 'debug', 'warn', 'error', 'fatal'])
    .withMessage('Invalid log level'),
  body('message')
    .isString()
    .notEmpty()
    .withMessage('Message is required'),
  body('source')
    .isString()
    .notEmpty()
    .withMessage('Source is required'),
  // Optional fields
  body('meta').optional().isObject(),
  body('timestamp').optional().isISO8601(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = { validateLog };
