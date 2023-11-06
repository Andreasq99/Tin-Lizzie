const express = require('express');
const router = express.Router();

// Define a route for the homepage (GET '/')
router.get('/', (req, res) => {

  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.get('/registration', (req,res)=>{
  res.render('user-registration');
});

router.get('/about',(req,res)=>{
  res.render('about');
});

router.get('/contact',(req,res)=>{
  res.render('contact');
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