const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const baseController = require('../controllers/baseController');
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

router.use('/users', require('./users'));
router.use('/about', require('./about')); // Routes for different views
router.use('/dashboard', require('./dashboard'));
router.use('/newUser', require('./newUser')); 

router.get('/', baseController.index); // For Home

// Authentication utility, move to utilities later
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };
  
// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  
//middleware
router.get('/profile', requiresAuth(), (req, res) => {
res.send(JSON.stringify(req.oidc.user, null, 2));
});


router.use((req, res, next) => {
  if (req.oidc && req.oidc.user) {
    req.user = req.oidc.user; // Attach the Auth0 user info to req.user
  }
  next();
});

module.exports = router;