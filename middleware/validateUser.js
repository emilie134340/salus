const { auth, requiresAuth } = require('express-openid-connect');
const User = require('../models/user'); // Adjust path as needed

const validateUser = async (req, res, next) => {
  try {
    // Check if the user is authenticated
    console.log("validating");
    console.log(JSON.stringify(req.oidc));

    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ message: 'Please log in to access this resource' });
    }

    // Extract user ID from the Auth0 `sub` field in the JWT
    const userId = req.oidc.user.sub;
    console.log(userID);
    // Check if the user exists in the database
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      // Redirect to create user page if no account exists
      return res.redirect('/login');
    }

    // Proceed to the next middleware/route if user exists
    next();
  } catch (error) {
    console.error('Error validating user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = validateUser;
