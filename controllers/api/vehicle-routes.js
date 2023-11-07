const express = require('express');
const router = express.Router();
const { Vehicle, VehicleImage } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ include: VehicleImage, });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newVehicle = await Vehicle.create(req.body);
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
});


router.get('/:id', async (req,res)=>{
  try{
    const dbVehicleData = await Vehicle.findByPk(req.params.id);
    const vehicle = dbVehicleData.get({plain:true});
    res.send(vehicle);
  } catch(err){
    res.status(400).json(err);
  }
});

router.get('/card/:id', async (req,res)=>{
  try{
    const dbVehicleData = await Vehicle.findByPk(req.params.id, {
      include: [
        {
        model: VehicleImage,
        attributes: [
          'imagePath',
          'description',
          ]
        }
      ],
    });

    const vehicleData = dbVehicleData.get({ plain: true });
    res.send(vehicleData);
  } catch (err) {
    response.status(400).json(err);
  }
});
// Add more vehicle-related routes as needed

module.exports = router;
