const express = require('express');
const app = express();

// Import user and vehicle routes
const userRoutes = require('./routes/user-routes');
const vehicleRoutes = require('./routes/vehicle-routes');

app.use(express.json()); // Enable JSON request body parsing

// Use the user and vehicle routes
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
