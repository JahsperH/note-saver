const express = require('express');

const noterouter = require('./noterouter.js');

const app = express();

app.use("/api", noterouter);

module.exports = app;