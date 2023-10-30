const express = require('express');
const router = express.Router();
const { Seller, Customer } = require('../models');

// Seller registration route
router.post('/register', async (req, res) => {
  try {
    // Implement registration logic here
    // Example: Create a new seller in the database
    const { first_name, last_name, email, password } = req.body;
    const customer = await Customer.create({ first_name, last_name, email, password });
    const seller = await Seller.create({ customerId: customer.id });

    // Return a success response or user data
    res.status(201).json({ message: 'Registration successful', user: seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Seller login route
router.post('/login', async (req, res) => {
  try {
    // Implement login logic here
    // Example: Authenticate the user, generate a token, and send it in the response
    // Replace this with your authentication logic
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer || customer.password !== password) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const seller = await Seller.findOne({ where: { customerId: customer.id } });

    // Generate a token and send it in the response
    // Replace this with your token generation logic
    const token = 'your-generated-token';

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Seller profile route (protected route, requires authentication)
router.get('/profile', async (req, res) => {
  try {
    // Implement profile retrieval logic here
    // Example: Retrieve the seller's profile data from the database
    // You can use authentication middleware to ensure the user is logged in

    // Replace this example with your logic to fetch the seller's profile data
    const customerId = req.user.id; // Assuming you have a user object with an ID
    const customer = await Customer.findByPk(customerId, {
      include: [Seller],
    });

    if (!customer || !customer.seller) {
      return res.status(404).json({ message: 'Seller profile not found' });
    }

    // Return the seller's profile data
    res.status(200).json({ seller: customer.seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Profile retrieval failed' });
  }
});

module.exports = router;
