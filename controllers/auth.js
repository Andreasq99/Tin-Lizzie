const express = require('express');
const router = express.Router();
const { User } = require('../models'); 
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

// Route to render the registration form
router.get('/register', (req, res) => {
  res.render('registration'); 
});

// Route to handle form submissions and create a new user
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Return validation errors to the client
        return res.status(400).json({ errors: errors.array() });
      }

      const { first_name, last_name, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); 

      // Create a new user with first_name, last_name, email, and password
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;
