// Import necessary modules
const express = require('express');
const sequelize = require('./config/connection'); // Import the sequelize object from connection.js

// Create an Express application
const app = express();

// Define a port for your server
const PORT = process.env.PORT || 3000;

// Middleware setup (you can add more middleware as needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes (import and use your route files here)
const customerRoutes = require('./routes/customer-routes');
const vehicleRoutes = require('./routes/vehicle-routes');
const buyerRoutes = require('./routes/buyer-routes');
const sellerRoutes = require('./routes/seller-routes');
const carMetricsRoutes = require('./routes/carMetrics-routes');


app.use('/api/customers', customerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/carmetrics', carMetricsRoutes);
app.use('/api/buyers', buyerRoutes);

// Start the Express server after the database connection is established
sequelize
  .sync() // Sync your database models with the database
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

