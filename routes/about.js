const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.get('/', baseController.about); // For About
router.get('/privacy', baseController.privacy); // For Privacy Policy

module.exports = router;