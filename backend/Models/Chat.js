const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports=  Chat;