const express = require('express');
const router = express.Router();

// Import controller modules
const homeRoutes = require('./homeRoutes');
const api = require('./api');
const carapi = require('./carapi-routes');
//const chatWithGPT = require('./chatgpt.js');

// Define routes and associate them with controllers
router.use('/', homeRoutes);
router.use('/carapi', carapi);
router.use('/api',api);

module.exports = router;
