const express = require('express');
const next = require('next');
require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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