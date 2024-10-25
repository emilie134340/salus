const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.use('/users', require('./users'));

router.get('/', baseController.index); // For Home

module.exports = router;