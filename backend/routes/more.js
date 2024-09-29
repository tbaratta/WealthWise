const express = require('express');
const { json } = require('express');
const router = express.Router();
const controller = require('../controllers/more/controller');
router.use(json());

// Define the route for the settings
router.post('/:id', controller.postFakeTransaction);
router.get('/', controller.getFakeTransaction);

module.exports = router;