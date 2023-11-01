const express = require('express');
const router = express.Router();
const VehicleImage = require('../models/vehicleImage');

// Create a new vehicle image
router.post('/', async (req, res) => {
  try {
    const { vehicleId, imagePath, description } = req.body;

    // Create a new vehicle image record
    const newImage = await VehicleImage.create({
      vehicleId,
      imagePath,
      description,
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Retrieve vehicle images by vehicleId
router.get('/byVehicle/:vehicleId', async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;

    // Find all images associated with the specified vehicle
    const images = await VehicleImage.findAll({
      where: { vehicleId },
    });

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
