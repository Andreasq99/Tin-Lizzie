const { User, Vehicle, VehicleImage } = require('../models');
const faker = require('@faker-js/faker');

async function seedData() {
  try {
    // Seed User data
    for (let i = 0; i < 50; i++) {
      await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        phone_number: faker.phone.phoneNumber(),
      });
    }

    // Seed Vehicle data
    for (let i = 0; i < 30; i++) {
      const model = faker.vehicle.model();
      const vehicle = await Vehicle.create({
        make: faker.vehicle.manufacturer(),
        model: model,
        year: faker.datatype.number({ min: 1990, max: 2023 }),
        price: faker.finance.amount({ min: 100, max: 100000 }),
        mileage: faker.datatype.number({ min: 0, max: 500000 }),
        color: faker.vehicle.color(),
        condition: faker.helpers.randomize(['New', 'Used', 'Certified Pre-Owned', 'Does Not Run', 'Parts Only']),
        description: faker.lorem.sentence(),
      });

      // Create images associated with the vehicle
      for (let j = 0; j < 3; j++) { // Create 3 images for each vehicle
        const image = await VehicleImage.create({
          vehicleId: vehicle.id,
          imagePath: faker.image.imageUrl(400, 400, model.toLowerCase(), true), 
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
