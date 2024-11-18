// only have the index route in here
const express = require('express'); // Import express
require('dotenv').config(); // Import dotenv
const app = express(); // Initialize express
const static = require('./routes/static'); // Import static routes
const expressLayout = require('express-ejs-layouts'); // Import express layouts
const indexRoutes = require('./routes/index');
const mongodb = require('./database/index'); // connect to mongo
const bodyParser = require('body-parser'); // for json
const connectDB = require('./database/db')

app.set('view engine', 'ejs'); // Set view engine to ejs
app.use(expressLayout); // Use express layouts
app.set('layout', './layouts/layout'); // Set layout to layout.ejs

// move this to index
const newUserRoutes = require('./routes/newUser');
app.use(express.json()); // Middleware to parse JSON bodies
app.use(newUserRoutes); // Register the newUser route

//Routes
app.use(static); // Static route

// Define port and host
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

connectDB();

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