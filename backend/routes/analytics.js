// analytics.js (in the routes directory)
const express = require('express');
const router = express.Router();
const controller = require('../controllers/analytics/controller');

// Route to get analytics data
router.get('/:userId', controller.getAnalytics);

module.exports = router;
