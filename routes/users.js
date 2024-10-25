const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUser);

module.exports = router;