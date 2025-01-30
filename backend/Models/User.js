const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  verificationToken: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
