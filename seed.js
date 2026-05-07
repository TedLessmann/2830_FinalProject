const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Workout = require("./models/Workout");
const Goal = require("./models/Goal");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await User.deleteMany();
    await Workout.deleteMany();
    await Goal.deleteMany();


    console.log("Seed data added successfully");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seedDatabase();
