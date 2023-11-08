const { User, Vehicle, VehicleImage } = require('../models');
const faker = require('@faker-js/faker');

async function clearTables() {
  try {
    // Delete all records from the tables
    await User.destroy({ where: {} });
    await Vehicle.destroy({ where: {} });
    await VehicleImage.destroy({ where: {} });

    console.log('Tables cleared successfully.');
  } catch (error) {
    console.error('Error clearing tables:', error);
  }
}

async function seedData() {
  try {
    // Seed User data
    const userArray = [];
    for (let i = 0; i < 50; i++) {
      const user = await User.create({
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
      userArray.push(user); // Add created user to the userArray
    }

    // Seed Vehicle data
    for (let i = 0; i < 30; i++) {
      const randomUser = faker.helpers.arrayElement(userArray); // Randomly select a user from userArray
      const model = faker.vehicle.model();
      const make = faker.vehicle.manufacturer();
      const type = faker.vehicle.type(); 
      const validTypes = ['car', 'truck', 'SUV', 'Convertible', 'Sedan', 'Sportscar'];
      const defaultType = 'car'; // Set a default type
      const vehicle = await Vehicle.create({
        make: make,
        model: model,
        year: faker.number.int({ min: 1990, max: 2023 }),
        vin: faker.vehicle.vin(),
        rating: faker.number.int({ min: 0, max: 100 }),
        price: faker.finance.amount({ min: 100, max: 100000 }),
        mileage: faker.number.int({ min: 0, max: 500000 }),
        color: faker.vehicle.color(),
        condition: faker.helpers.arrayElement(['New', 'Used', 'Certified Pre-Owned', 'Does Not Run', 'Parts Only']),
        description: faker.lorem.sentence(),
        type: validTypes.includes(type) ? type : defaultType,
        UserId: randomUser.id, 
      });

      // Create images associated with the vehicle
      for (let j = 0; j < 3; j++) { 
        const imagePathCategory = make.replace(/\s/g, '');
        await VehicleImage.create({
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
