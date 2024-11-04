const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.use('/users', require('./users'));
router.use('/about', require('./about')); // Routes for different views

router.get('/', baseController.index); // For Home

module.exports = router;