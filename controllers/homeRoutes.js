const express = require('express');
const router = express.Router();
const {Vehicle, VehicleImage} = require('../models');
//const withAuth = require('../utils/loggedInAuth');


// Define a route for the homepage (GET '/')
router.get('/', async (req, res) => {
  const dbVehiclesData = await Vehicle.findAll({
    order: [['price', 'DESC']],
    attributes: ['id','year','model','price','condition','mileage','make', 'rating'],
    include: [
      {
      model: VehicleImage,
      attributes: [
        'imagePath',
        'description'],
      },
    ],
    limit: 12,
  });
const vehicles = dbVehiclesData.map((vehicle) => {
    const firstImage = vehicle.VehicleImages[0];
    const imagePath = firstImage ? firstImage.imagePath : '';
    return {
      id: vehicle.id,
      year: vehicle.year,
      model: vehicle.model,
      price: vehicle.price,
      condition: vehicle.condition,
      mileage: vehicle.mileage,
      make: vehicle.make,
      imagePath: imagePath,
      rating: vehicle.rating,
    };
  });
  


  res.render('homepage', {
    vehicles,
    loggedIn: req.session.loggedIn
  });
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.get('/registration', (req,res)=>{
  res.render('user-registration');
});

router.get('/vehicle-registration', (req,res)=>{
  res.render('vehicle-registration');
});

router.get('/about',(req,res)=>{
  res.render('about');
});

router.get('/contact',(req,res)=>{
  res.render('contact');
});

router.get('/vehicle-registration', (req,res)=>{
  res.render('vehicle-registration');
});

// router.get('/vehicle/:id', async (req, res) => {
//   try {
//     const dbVehicleData = await Vehicle.findByPk(req.params.id);
//     const vehicle = dbVehicleData.get({ plain: true });
//     res.render('vehicle', { vehicle });
//   } catch (err) {
//     console.log(err); // Log the error
//     res.status(400).json(err);
//   }
// });

router.get('/vehicle/:id', async (req, res) => {
  try {
    const vehicleId = req.params.id;
    if (!/^\d+$/.test(vehicleId)) {
      console.error('Invalid vehicle ID:', vehicleId);
      return res.status(400).send('Invalid vehicle ID');
    }

    // Fetch the vehicle and its associated images
    const vehicle = await Vehicle.findByPk(vehicleId, {
      include: [
        {
          model: VehicleImage,
          attributes: ['imagePath', 'description'],
        },
      ],
      attributes: ['id', 'year', 'make', 'model', 'price', 'condition', 'mileage', 'rating'],
    });

    if (!vehicle) {
      console.error('Vehicle not found:', vehicleId);
      return res.status(404).send('Vehicle not found');
    }

    // Transform the data to the format you want to render in the template
    const vehicleData = {
      id: vehicle.id,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      price: vehicle.price,
      condition: vehicle.condition,
      mileage: vehicle.mileage,
      rating: vehicle.rating,
    };
    
    // Extract image data from the vehicle and pass it to the partial
    const vehicleImages = vehicle.VehicleImages.map((image) => ({
      imagePath: image.imagePath,
      description: image.description,
    }));
    console.log('Vehicle Images:', vehicleImages);
    // Render your Handlebars template with the vehicle data and images
    res.render('vehicle', { vehicle: vehicleData, vehicleImages });
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;