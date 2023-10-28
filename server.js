// In your app.js or main file
const Sequelize = require('sequelize');

// const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
//   host: 'localhost',
//   dialect: 'mysql',
//   // Other configuration options if needed
// });

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
