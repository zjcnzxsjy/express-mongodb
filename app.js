const express = require('express');
const app = express();
const config = require('./config/db');
const api = require('./src/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})