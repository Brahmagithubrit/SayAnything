const mongoose = require("mongoose");

const userSchema2 = new mongoose.Schema({
  userName: String,
  email: String,
  actualName: String,
});

const User2 = mongoose.model("User2", userSchema2);

module.exports = User2;
