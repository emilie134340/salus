const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const baseController = require('../controllers/baseController');
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();
const validateUser = require('../middleware/validateUser'); // Import validateUser middleware

router.use('/users', require('./users'));
router.use('/about', require('./about')); // Routes for different views
router.use('/dashboard', require('./dashboard'));
//router.use('/', require('./newUser')); 

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
// router.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// Middleware to authenticate and validate the user
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

// Validation endpoint
router.get('/validateuser', requiresAuth(), validateUser, (req, res) => {
  res.status(200).json({ message: 'User validated successfully. Proceeding...' });
});

// Dashboard route (requires user validation)
// router.get('/dashboard', requiresAuth(), validateUser, (req, res) => {
//   res.status(200).render('dashboard', {
//     user: req.oidc.user, // Pass the authenticated user's details to the view
//   });
//   console.log(user);
// });

// // Createuser page route
// router.get('/createuser', (req, res) => {
//   if (!req.oidc.isAuthenticated()) {
//     return res.redirect('/login');  // Redirect to Auth0 login if not authenticated
//   }
//   // If already logged in, proceed to create user post request
//   res.status(200).json({ message: 'You are logged in. Please send a POST request to create your user.' });
// });

module.exports = router;
