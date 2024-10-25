const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.get('/about', baseController.about); // For About
router.get('/about/privacy', baseController.privacy); // For Privacy Policy

module.exports = router;