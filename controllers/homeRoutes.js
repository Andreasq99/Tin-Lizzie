const express = require('express');
const router = express.Router();
const {Vehicle, VehicleImage} = require('../models');
//const withAuth = require('../utils/loggedInAuth');

// Define a route for the homepage (GET '/')
router.get('/', async (req, res) => {
  const dbVehiclesData = await Vehicle.findAll({
    order: [['price', 'DESC']],
    attributes: ['year','model','price','condition','mileage'],
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
  const dbVehicles = dbVehiclesData;
  const vehicles = [];
  for(i=0;i<12;i++){
    vehicles.push(dbVehicles[i]);
  }
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