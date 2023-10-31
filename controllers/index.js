const router = require('express').Router();

const dbRoutes = require('./routes');

router.use('/db', dbRoutes);

module.exports = router;
