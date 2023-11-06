const express = require('express');
const router = express.Router();
const { Love, View, Like, Vehicle } = require('../../models');

// Create a like for a vehicle
router.post('/api/vehicles/:vehicleId/likes', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { userId } = req.body;
    const { userId } = req.body; 

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the user has already liked the vehicle
    const existingLike = await Like.findOne({
      where: { userId, vehicleId },
    });

    if (existingLike) {
      return res.status(400).json({ error: 'User has already liked this vehicle' });
    }

    // Create a like record in the Like table
    const like = await Like.create({
      userId,
      vehicleId,
    });

    // Update the like count in the Vehicle table
    vehicle.likes += 1;
    await vehicle.save();

    return res.status(201).json(like);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove a like for a vehicle
router.delete('/api/vehicles/:vehicleId/likes/:likeId', async (req, res) => {
  try {
    const { vehicleId, likeId } = req.params;
    const { userId } = req.body; 

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the like exists
    const like = await Like.findOne({
      where: { id: likeId, vehicleId },
    });

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    // Check if the user is the owner of the like
    if (like.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the like record from the Like table
    await like.destroy();

    // Update the like count in the Vehicle table
    vehicle.likes -= 1;
    await vehicle.save();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a love for a vehicle
router.post('/api/vehicles/:vehicleId/loves', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { userId } = req.body; 

    // Validate user and vehicle existence
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the user has already loved the vehicle
    const existingLove = await Love.findOne({
      where: { userId, vehicleId },
    });

    if (existingLove) {
      return res.status(400).json({ error: 'User has already loved this vehicle' });
    }

    // Create a love record in the Love table
    const love = await Love.create({
      userId,
      vehicleId,
    });

    // Update the love count in the Vehicle table
    vehicle.loves += 1;
    await vehicle.save();

    return res.status(201).json(love);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove a love for a vehicle
router.delete('/api/vehicles/:vehicleId/loves/:loveId', async (req, res) => {
  try {
    const { vehicleId, loveId } = req.params;
    const { userId } = req.body;

    // Validate user and vehicle existence
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the love exists
    const love = await Love.findOne({
      where: { id: loveId, vehicleId },
    });

    if (!love) {
      return res.status(404).json({ error: 'Love not found' });
    }

    // Check if the user is the owner of the love
    if (love.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the love record from the Love table
    await love.destroy();

    // Update the love count in the Vehicle table
    vehicle.loves -= 1;
    await vehicle.save();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a view for a vehicle
router.post('/api/vehicles/:vehicleId/views', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { userId } = req.body; 

    // Validate user and vehicle existence
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the user has already viewed the vehicle
    const existingView = await View.findOne({
      where: { userId, vehicleId },
    });

    if (existingView) {
      return res.status(400).json({ error: 'User has already viewed this vehicle' });
    }

    // Create a view record in the View table
    const view = await View.create({
      userId,
      vehicleId,
    });

    // Update the view count in the Vehicle table
    vehicle.views += 1;
    await vehicle.save();

    return res.status(201).json(view);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
