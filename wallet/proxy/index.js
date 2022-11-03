const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3201;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:9052";

// Logging
app.use(morgan('dev'));

// CORS
app.use(cors());

// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

// GET wallet/lock
// POST wallet/unlock {"pass": ""}
app.get('/wallet/remove', (req, res, next) => {
  fs.readFile(path.join(process.env.HOME, '/ergo/.ergo/wallet'), 'utf8', function (err, data) {
    if (err) {

      return console.log(err);
    }
    console.log(data);
    res.send(JSON.parse(data));
  });
});

// Proxy endpoints
app.use(createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
