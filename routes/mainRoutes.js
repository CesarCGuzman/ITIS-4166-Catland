// Modules
const express = require('express');
const controller = require('../controllers/mainController.js');

const router = express.Router();

router.get('/', controller.index);

// Routes on the footer
router.get('/about', controller.about);

router.get('/contact', controller.contact);

router.get('/twitter', controller.twitter);

router.get('/facebook', controller.facebook);

// Export the router
module.exports = router;