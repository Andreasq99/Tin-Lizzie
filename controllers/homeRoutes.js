const express = require('express');
const router = express.Router();

// Define a route for the homepage (GET '/')
router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login',(req,res)=>{
  res.render('login');
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

// Export the router
module.exports = router;