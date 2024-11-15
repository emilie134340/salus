const express = require('express');
const router = express.Router();
const newUserController = require('../controllers/newUser');
// require auth to create user
router.post('/create-user', newUserController.createNewUser);

module.exports = router;