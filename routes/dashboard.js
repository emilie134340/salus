const express = require('express');
const router = express.Router();
const dashController = require('../controllers/dashController');
const { auth, requiresAuth } = require('express-openid-connect');
const validateUser = require('../middleware/validateUser');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };
router.use(auth(config));

router.get('/', requiresAuth(), validateUser, dashController.buildDashboard); // For Dashboard

module.exports = router;