const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const messageRoutes = require("./routes/messageRoutes");
const User = require("./models/User");

const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const connectedUsers = {}; // { userId: [socketId1, socketId2] }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("registerUser", (userId) => {
    if (!connectedUsers[userId]) connectedUsers[userId] = [];
    connectedUsers[userId].push(socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
      if (!senderId || !receiverId || !text) return;
  
      try {
          const message = new Message({ senderId, receiverId, text });
          await message.save();
  
          await User.findByIdAndUpdate(senderId, { $addToSet: { chats: receiverId } });
          await User.findByIdAndUpdate(receiverId, { $addToSet: { chats: senderId } });
  
          console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
  
          if (connectedUsers[receiverId]) {
              connectedUsers[receiverId].forEach((socketId) => {
                  io.to(socketId).emit("receiveMessage", { senderId, text });
              });
          }
      } catch (error) {
          console.error("Error sending message:", error);
      }
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    Object.keys(connectedUsers).forEach((userId) => {
      connectedUsers[userId] = connectedUsers[userId].filter((id) => id !== socket.id);
      if (connectedUsers[userId].length === 0) delete connectedUsers[userId];
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data

app.use(cors());

app.use("/auth", authRoutes);
app.use("/providers", providerRoutes);
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});