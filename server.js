const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const next = require('next');
require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Log requests
app.use(express.json()); // Parse JSON requests

app.prepare().then(() => {
    const server = express();

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${host}:${port}`);
    });
});

const { auth } = require('express-openid-connect');

// in .env
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  secret: process.env.SECRET,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientID: process.env.CLIENT_ID,

};

// Disable HTTPS requirement in development
if (process.env.NODE_ENV !== 'production') {
    config.baseURL = 'http://localhost:3000'; // or whatever port you're using
    config.idpLogout = false; // Only allow logout on HTTPS
  }

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });