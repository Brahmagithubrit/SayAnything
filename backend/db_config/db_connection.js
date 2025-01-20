const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.mongo_url);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectToDB;
