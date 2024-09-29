const express = require('express');
const { json } = require('express');
const router = express.Router();
const controller = require('../controllers/settings/controller');
router.use(json());

// Define the route for the settings
router.get('/:id', controller.getSettings);
router.put('/:id', controller.putSettings);

module.exports = router;