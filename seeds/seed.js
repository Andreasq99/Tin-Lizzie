const { faker } = require('@faker-js/faker'); 
const { User, Vehicle } = require('./models'); 

async function seedData() {
  // Seed User data
  for (let i = 0; i < 10; i++) {
    await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.name.findName(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    });
  }

  // Seed Vehicle data
  for (let i = 0; i < 10; i++) {
    await Vehicle.create({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.datatype.number({ min: 2000, max: 2023 }),
      price: faker.random.number({ min: 5000, max: 50000 }),
      mileage: faker.datatype.number({ min: 0, max: 150000 }),
      color: faker.vehicle.color(),
      condition: faker.random.arrayElement(['New', 'Used', 'Certified Pre-Owned']),
      description: faker.lorem.sentence(),
    });
  }

  console.log('Data seeded successfully.');
}

seedData().catch((error) => {
  console.error('Error seeding data:', error);
});
