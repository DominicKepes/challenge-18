// seed.js

const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/studentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});


const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const users = await User.insertMany([
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
      // Add more users as needed
    ]);

    // Create thoughts
    const thoughts = await Thought.insertMany([
      { thoughtText: 'Thought 1', username: users[0].username },
      { thoughtText: 'Thought 2', username: users[1].username },
      // Add more thoughts as needed
    ]);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
};

seedDatabase();
