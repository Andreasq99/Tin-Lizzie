const express = require('express');
const app = express();

// Import user and vehicle routes
const routes = require('./controllers');

app.use(express.json()); // Enable JSON request body parsing

// Use the routes
app.use(routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
