// app.js

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = "mongodb://<>:<>@sensordataiot-shard-00-00-hmz0x.mongodb.net:27017,sensordataiot-shard-00-01-hmz0x.mongodb.net:27017,sensordataiot-shard-00-02-hmz0x.mongodb.net:27017/test?ssl=true&replicaSet=sensordataIOT-shard-0&authSource=admin&retryWrites=true";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'), );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import routes
var sensor = require('./routes/sensorroute');
app.use('/', sensor);

var port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on http://localhost:' + port);
});
