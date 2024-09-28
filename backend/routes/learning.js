// analytics.js (in the routes directory)
const express = require('express');
const router = express.Router();
const controller = require('../controllers/learning/controller');

// Route to get analytics data
router.get('/', controller.getLearning);
router.get('/:id', controller.getLearningById);

module.exports = router;
