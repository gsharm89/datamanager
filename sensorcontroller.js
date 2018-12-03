var Sensor = require('../models/sensormodel');

exports.sensor_create = function (req, res) {

	var currentTime = Date();

    var sensor = new Sensor(
        {
            sensorName: req.body.name,
            sensorType: req.body.type,
            measurementUnit: req.body.units,
            createdOn: currentTime,
        }
    );

    sensor.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send('Sensor Created successfully\n' + sensor)
    })
};


//create a simulated test sensor
exports.test_sensor_create = function (req, res) {

	var currentTime = Date();

	//var i = 0;

    var sensor = new Sensor(
        {
            sensorName: 'Test_Sensor',
            sensorType: 'temperature',
            measurementUnit: 'celsius',
            createdOn: currentTime,
        }
    );

    sensor.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send('Sensor Created successfully\n' + sensor)
    })
};

//get sensor detail for one sensor specified by sensor id
exports.sensor_details = function (req, res) {
    Sensor.findById(req.params.id, function (err, sensor) {
        if (err) res.send(err);
        res.send(sensor);
    })
};

//get sensor details for all sensors in db
exports.all_sensors_details = function(reg, res){
	Sensor.find({}, function(err, sensor){
		if(err) res.send(err);
		res.send(sensor);
	})

};


exports.sensor_csv_export = function(req, res){
	var filename = 'sensor.csv';
	var dataArray;

	Sensor.find().lean().exec({}, function(err, sensor){
		if(err) res.send(err);
		res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(sensor, true);
	});

};

//update a measurement value that is stored in the array. each measurement is stored with a corresponding timestamp
exports.sensor_update = function (req, res) {
    //this is to check if sensor parameters were passed to update call.
    //if they are passed, then the user desires to change the sensor profile.
    //if(req.body.type == undefined) {console.log("Not a type update")};
    //else{
    //}
    var updatedSensor = {"sensorValue" : req.body.value, timeStamp : Date()};
    Sensor.findByIdAndUpdate( req.params.id,{$push:{ measurement: updatedSensor}}, function (err, sensor) {
        if (err) res.send(err);
        res.send('Sensor measurmenet has been updated.');
    });
};

//delete one sensor specified by the sensor id
exports.sensor_delete = function (req, res) {
    Sensor.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.send('Sensor Deleted.');
    })
};

//delete all sensors in the db
exports.sensor_delete_all = function(req, res){
	Sensor.deleteone({}, function(err) {
		if(err) res.send(err);
		res.send("All Sensors Deleted!");
	})

};