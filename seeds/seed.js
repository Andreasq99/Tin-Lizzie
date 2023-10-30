const { faker } = require('@faker-js/faker'); // For generating fake data
const { Customer, Buyer, Seller, Vehicle, BuyersLikes } = require('../models');

// Function to generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create random vehicle data with images
function createRandomVehicle() {
  return {
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: getRandomInt(1990, 2023),
    price: getRandomInt(5000, 50000),
    description: faker.lorem.sentence(),
    imageUrl: faker.image.urlLoremFlickr({ category: 'transport' }),
  };
}

// Function to create random buyer data
function createRandomBuyer() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    zip_code: faker.location.zipCode(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// Function to create random seller data
function createRandomSeller() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// Function to create random customer data
function createRandomCustomer() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    zip_code: faker.location.zipCode(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    };
}

(async () => {
  try {
    // Seed customers
    const customers = [];
    for (let i = 0; i < 20; i++) {
      const customerData = createRandomCustomer();
      const customer = await Customer.create(customerData);
      customers.push(customer);
    }

    // Seed buyers
    const buyers = [];
    for (let i = 0; i < 20; i++) {
      const buyerData = createRandomBuyer();
      const buyer = await Buyer.create(buyerData);
      buyers.push(buyer);
    }

    // Seed sellers
    const sellers = [];
    for (let i = 0; i < 30; i++) {
      const sellerData = createRandomSeller();
      const seller = await Seller.create(sellerData);
      sellers.push(seller);
    }

    // Seed vehicles
    const vehicles = [];
    for (let i = 0; i < 30; i++) {
      const vehicleData = createRandomVehicle();
      const vehicle = await Vehicle.create(vehicleData);
      vehicles.push(vehicle);
    }

    // Seed likes by 10 different buyers
    for (let i = 0; i < 10; i++) {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];

      await BuyersLikes.create({
        buyerId: randomBuyer.id,
        vehicleId: randomVehicle.id,
        liked: true, // Assuming "liked" represents a like action
      });
    }

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    // Close the database connection if necessary
    process.exit();
  }
})();
