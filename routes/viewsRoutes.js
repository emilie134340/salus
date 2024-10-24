const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.get('/', baseController.index); // For Home
router.get('/about', baseController.about); // For About
router.get('/about/privacy', baseController.privacy); // For Privacy Policy

module.exports = router;