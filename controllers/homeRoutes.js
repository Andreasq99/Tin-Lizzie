const express = require('express');
const router = express.Router();

// Define a route for the homepage (GET '/')
router.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// Define a route for a contact page (GET '/contact')
router.get('/contact', (req, res) => {
  res.send('Contact Us: contact@example.com');
});

// Define a route for an about page (GET '/about')
router.get('/about', (req, res) => {
  res.send('About Us: We are an example company.');
});

// Export the router
module.exports = router;