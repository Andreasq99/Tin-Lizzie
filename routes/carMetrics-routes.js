const express = require('express');
const router = express.Router();
const { CarMetrics, Vehicle } = require('../models'); // Import the CarMetrics and Vehicle models

// Route to update metrics for a vehicle listing (protected route, requires authentication)
router.put('/update/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Implement logic to update metrics for a vehicle listing in the database
    // You can use authentication middleware to ensure the user is authorized to update metrics
    const { views, likes, loves, time_on_site, lowest_price } = req.body;

    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Create or update metrics in the CarMetrics table for the vehicle
    let carMetrics = await CarMetrics.findOne({ where: { vehicleId } });

    if (!carMetrics) {
      carMetrics = await CarMetrics.create({
        vehicleId,
        views,
        likes,
        loves,
        time_on_site,
        lowest_price,
      });
    } else {
      carMetrics.views = views;
      carMetrics.likes = likes;
      carMetrics.loves = loves;
      carMetrics.time_on_site = time_on_site;
      carMetrics.lowest_price = lowest_price;

      await carMetrics.save();
    }

    res.status(200).json({ message: 'Metrics updated successfully', carMetrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update metrics' });
  }
});

// Route to retrieve metrics for a specific vehicle listing
router.get('/get/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Implement logic to retrieve metrics for a specific vehicle listing
    const carMetrics = await CarMetrics.findOne({ where: { vehicleId } });

    if (!carMetrics) {
      return res.status(404).json({ message: 'Metrics not found for this vehicle' });
    }

    res.status(200).json({ carMetrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch metrics' });
  }
});

module.exports = router;

