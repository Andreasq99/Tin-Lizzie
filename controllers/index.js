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
router.use('/carapi', action);
router.use('/user', action);
router.use('/vehicleImage', action);
router.use('/vehicle', action);



module.exports = router;
