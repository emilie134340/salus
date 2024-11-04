const express = require('express'); // Import express
require('dotenv').config(); // Import dotenv
const app = express(); // Initialize express
const static = require('./routes/static'); // Import static routes
const expressLayout = require('express-ejs-layouts'); // Import express layouts
const indexRoutes = require('./routes/index');
const mongodb = require('./database/index'); // connect to mongo
const bodyParser = require('body-parser'); // for json
const { auth } = require('express-openid-connect'); //for auth0
const { requiresAuth } = require('express-openid-connect');

app.set('view engine', 'ejs'); // Set view engine to ejs
app.use(expressLayout); // Use express layouts
app.set('layout', './layouts/layout'); // Set layout to layout.ejs

//Routes
app.use(static); // Static route
app.use('/about', require('./routes/viewsRoutes'));

// Define port and host
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//middleware
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', indexRoutes); // routes connect

// Start the server, connect to mongo
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port http://${host}:${port}`);
  }
});