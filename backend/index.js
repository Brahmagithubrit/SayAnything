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
const port = process.env.port || 5000;

app.use(
  cors({
    origin: `https://sayanythingfrontend.vercel.app`,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `https://sayanythingfrontend.vercel.app`,
    methods: ["GET", "POST"],
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

server.listen(port, () => {
  console.log(`WebSocket server running on https://deploy:${port}`);
  connectToDB();
});
