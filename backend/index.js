const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
const connectToDB = require("./db_config/db_connection");
const Chat = require("./Models/Chat");
const User = require("./Models/User");
const User2 = require("./Models/User2");
const port = process.env.port || 5000;

app.use(
  cors({
    origin: `https://sayanythingbrahma.vercel.app`,
    // origin: `http://localhost:5173`,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `https://sayanythingbrahma.vercel.app`,
    methods: ["GET", "POST"],
    // origin: `http://localhost:5173`,

    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected, socket ID:", socket.id);

  socket.on("message", (msg) => {
    console.log(`Received from client: ${msg}`);
    io.emit("message", {
      userName: msg.userName,
      text: msg.text,
      socketId: socket.id,
    });
    console.log(`Sent back to all clients: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected, socket ID:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket endpoint");
});

app.post("/StoreChat", (req, res) => {
  const { userName, text, time } = req.body;
  const newChat = new Chat({ userName, text, time });
  newChat.save();
  res.status(200).send("Chat stored successfully");
  console.log(req.body);
});

app.get("/GetChats", async (req, res) => {
  const All_chats = await Chat.find();
  console.log(All_chats);
  res.status(200).send(All_chats);
});

app.post("/storeUser", async (req, res) => {
  const { userName, email, actualName } = req.body;
  const newUser = new User2({ userName, email, actualName });

  try {
    await newUser.save();
    res.status(200).json({ message: "User stored successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error storing user" });
  }

  console.log(req.body);
});

server.listen(port, () => {
  console.log(`WebSocket server running on https://deploy:${port}`);
  connectToDB();
});
