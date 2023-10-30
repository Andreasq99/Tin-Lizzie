const express = require('express');
const router = express.Router();
const { Vehicle } = require('../models'); // Import the Vehicle model

// Route to list all vehicles
router.get('/', async (req, res) => {
  try {
    // Implement logic to fetch all vehicle listings from the database
    const vehicles = await Vehicle.findAll();

    // Return the list of vehicles
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
});

// Route to create a new vehicle listing (protected route, requires authentication)
router.post('/create', async (req, res) => {
  try {
    // Implement logic to create a new vehicle listing in the database
    // You can use authentication middleware to ensure the user is a seller
    const { vehicle_type, price, make, model, year, description } = req.body;
    
    // Replace the following with your actual database insert code
    const newVehicle = await Vehicle.create({
      vehicle_type,
      price,
      make,
      model,
      year,
      description,
    });

    res.status(201).json({ message: 'Vehicle listing created successfully', vehicle: newVehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create vehicle listing' });
  }
});

// Route to update a vehicle listing (protected route, requires authentication)
router.put('/update/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;
  
  try {
    // Implement logic to update a vehicle listing in the database
    // You can use authentication middleware to ensure the user is the owner/seller
    const { price, description } = req.body;
    
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Update vehicle information
    vehicle.price = price;
    vehicle.description = description;

    // Save the updated vehicle
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle listing updated successfully', vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update vehicle listing' });
  }
});

// Route to delete a vehicle listing (protected route, requires authentication)
router.delete('/delete/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Implement logic to delete a vehicle listing from the database
    // You can use authentication middleware to ensure the user is the owner/seller
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Delete the vehicle
    await vehicle.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete vehicle listing' });
  }
});

module.exports = router;