const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const speciesRoutes = require('./api/routes/species')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser());
app.use('/species', speciesRoutes);

module.exports = app;