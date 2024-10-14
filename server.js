const express = require('express'); // Import express
require('dotenv').config(); // Import dotenv
const app = express(); // Initialize express
const static = require('./routes/static'); // Import static routes
const expressLayout = require('express-ejs-layouts'); // Import express layouts

// Define port and host
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.set('view engine', 'ejs'); // Set view engine to ejs
app.use(expressLayout); // Use express layouts
app.set('layout', './layouts/layout'); // Set layout to layout.ejs

//Routes
app.use(static) // Static route
    .get('/', (req, res) => res.render('index', { title: 'Home' })); // Index route

app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
