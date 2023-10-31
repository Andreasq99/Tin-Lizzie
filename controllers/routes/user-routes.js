// user-routes.js
const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Define routes for user resource
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Add more user-related routes as needed

module.exports = router;
