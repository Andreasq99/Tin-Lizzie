const express = require('express');
const router = express.Router();

const action = require('./action');
const user = require('./user-routes');
const vehicleImage = require('./vehicle-image-routes');
const vehicle = require('./vehicle-routes');

router.use('/actions', action);
router.use('/users',user);
router.use('/vehicles',vehicle);
router.use('/vehicle-images',vehicleImage);

module.exports = router;