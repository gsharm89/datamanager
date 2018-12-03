var express = require('express');
var router = express.Router();
var csv = require('csv-express');
var sensor_controller = require('../controllers/sensorcontroller');

//api calls

//create a sensor
router.post('/create', sensor_controller.sensor_create);
//simulate a sensor
router.post('/simulate', sensor_controller.test_sensor_create);


//get all sensors information
router.get('/all/', sensor_controller.all_sensors_details);
//export all sensor as csv
router.get('/export/', sensor_controller.sensor_csv_export);
//get one sensor information
router.get('/:id/', sensor_controller.sensor_details);

//update measurement reading for a sensor
router.put('/:id/update', sensor_controller.sensor_update);

//delete specified sensor based on unique id
router.delete('/:id/delete', sensor_controller.sensor_delete);
//delete all sensors
router.delete('/deleteall', sensor_controller.sensor_delete_all);


module.exports = router;