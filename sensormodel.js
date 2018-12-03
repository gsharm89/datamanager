var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
    sensorName: String,
    sensorType: String,
    createdOn: Date,
    measurementUnit: String,
    measurement: [{
    	timeStamp: Date,
    	sensorValue: Number,
    }]
});

// Export the model
module.exports = mongoose.model('Sensor', SensorSchema);