const express = require('express');
const router = express.Router();

// Import controller modules
const homeRoutes = require('./homeRoutes');
const action = require('./action');
const carapi = require('./carapi-routes');
const user = require('./user-routes');
const vehicleImage = require('./vehicle-image-routes');
const vehicle = require('./vehicle-routes');

// Define routes and associate them with controllers
router.use('/', homeRoutes);
router.use('/action', action);
router.use('/carapi', carapi);
router.use('/user', user);
router.use('/vehicleImage', vehicleImage);
router.use('/vehicle', vehicle);

module.exports = router;
