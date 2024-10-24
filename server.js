const express = require('express'); // Import express
require('dotenv').config(); // Import dotenv
const app = express(); // Initialize express
const static = require('./routes/static'); // Import static routes
const expressLayout = require('express-ejs-layouts'); // Import express layouts
const utils = require('./utilities/'); // Import utilities
const baseController = require('./controllers/baseController'); // Import base controller
const viewsRoutes = require('./routes/viewsRoutes'); // Import views routes

app.set('view engine', 'ejs'); // Set view engine to ejs
app.use(expressLayout); // Use express layouts
app.set('layout', './layouts/layout'); // Set layout to layout.ejs

//Routes
app.use(static) // Static route
    .get('/', utils.handleErrors(viewsRoutes)) // Index route
    .get('/about', utils.handleErrors(viewsRoutes)) // About route
    .get('/about/privacy', utils.handleErrors(viewsRoutes)); // Privacy route


// Catch 404 and forward to error handler
app.use(async (req, res, next) => {
    next({
        status: 404,
        message: 'Page Not Found'
    });
});

/************************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`)
    let message = err.status == 404 ? err.message : 'Oh no! There was a crash. Maybe try a different route?'
    res.render("./errors/error", {
        title: err.status || 'Server Error',
        message
    });
});

// Define port and host
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// Start server
app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
