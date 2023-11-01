const { User, Vehicle, VehicleImage } = require('../models');
const { faker } = require('@faker-js/faker');

async function seedData() {
  try {
    // Seed User data
    for (let i = 0; i < 50; i++) {
      await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        phone_number: faker.phone.number(),
      });
    }

    // Seed Vehicle data
    for (let i = 0; i < 30; i++) {
      const model = faker.vehicle.model();
      const validTypes = ['car', 'truck', 'SUV', 'Convertible', 'Sedan', 'Sportscar'];
      const defaultType = 'car'; // Set a default type
      const type = faker.vehicle.type(); // Generate a random vehicle type
      const vehicle = await Vehicle.create({
        make: faker.vehicle.manufacturer(),
        model: model,
        year: faker.number.int({ min: 1990, max: 2023 }),
        price: faker.finance.amount({ min: 100, max: 100000 }),
        mileage: faker.number.int({ min: 0, max: 500000 }),
        color: faker.vehicle.color(),
        condition: faker.helpers.arrayElement(['New', 'Used', 'Certified Pre-Owned', 'Does Not Run', 'Parts Only']),
        description: faker.lorem.sentence(),
        type: validTypes.includes(type) ? type : defaultType,
      });

      // Create images associated with the vehicle
      for (let j = 0; j < 3; j++) { // Create 3 images for each vehicle
        const imagePathCategory = type
        const image = await VehicleImage.create({
          vehicleId: vehicle.id,
          imagePath: faker.image.urlLoremFlickr({ category: imagePathCategory }),
          description: faker.lorem.sentence(),
        });
      }
    }

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Call the seedData function
seedData();
