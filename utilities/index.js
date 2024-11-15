// const { auth, requiresAuth } = require('express-openid-connect');
// const dotenv = require('dotenv');
// dotenv.config();

const Util = {};


/*****************************************
* Middleware For Handling Errors
* Wrap other functions in this for
* General Error Handling
****************************************/
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// // Authentication utility
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL
//   };
  
// // auth router attaches /login, /logout, and /callback routes to the baseURL
// Util.use(auth(config));

module.exports = Util