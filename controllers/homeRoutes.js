const express = require('express');
const router = express.Router();
const {Vehicle, VehicleImage} = require('../models');
//const withAuth = require('../utils/loggedInAuth');


// Define a route for the homepage (GET '/')
router.get('/', async (req, res) => {
  const dbVehiclesData = await Vehicle.findAll({
    order: [['price', 'DESC']],
    attributes: ['year','model','price','condition','mileage','make', 'rating'],
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

router.get('/vehicle/:id', async (req,res)=>{
  try{
    const dbVehicleData = await Vehicle.findByPk(req.params.id);
    const vehicle = dbVehicleData.get({ plain: true });
    res.render('vehicle',{ vehicle });
  } catch(err){
    console.log(err);
    res.status(400).json(err);
  }
});



module.exports = router;