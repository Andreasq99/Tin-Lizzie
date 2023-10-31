const { faker } = require('@faker-js/faker'); 
const { User, Vehicle } = require('../models'); 

async function seedData() {
  // Seed User data
  for (let i = 0; i < 10; i++) {
    await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.person.findName(),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    });
  }

  // Seed Vehicle data
  for (let i = 0; i < 10; i++) {
    await Vehicle.create({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.datatype.int({ min: 2000, max: 2023 }),
      price: faker.ecommerce.price({ min: 100, max: 100000 }),
      mileage: faker.number({ min: 0, max: 150000 }),
      color: faker.vehicle.color(),
      condition: faker.arrayElement(['New', 'Used', 'Certified Pre-Owned']),
      description: faker.lorem.sentence(),
    });
  }

  console.log('Data seeded successfully.');
}

seedData().catch((error) => {
  console.error('Error seeding data:', error);
});
