const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const port = process.env.port || 5000;

app.use(
  cors({
    origin: `${process.env.frontend_url}`,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${process.env.frontend_url}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected, socket ID:", socket.id);

  socket.on("message", (msg) => {
    console.log(`Received from client: ${msg}`);
    io.emit("message", { text: msg.text, socketId: socket.id });
    console.log(`Sent back to all clients: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected, socket ID:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket endpoint");
});

server.listen(port, () => {
  console.log(`WebSocket server running on http://localhost:${port}`);
});
