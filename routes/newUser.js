const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const validateUser = require('../middleware/validateUser');
const newUserController = require('../controllers/newUser');
// require auth to create user
router.post('/createuser', requiresAuth(), validateUser, newUserController.createNewUser);

module.exports = router;