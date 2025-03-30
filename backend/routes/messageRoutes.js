const express = require("express");
const Message = require("../models/Message"); 
const User = require("../models/User"); 
const router = express.Router();

const mongoose = require("mongoose"); // ✅ Add this line

// ✅ Save a new message in JSON format inside a single document
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔹 Ensure a conversation exists
    let conversation = await Message.findOne({ 
      participants: { $all: [senderId, receiverId] } 
    });

    if (!conversation) {
      // ✅ Create a new conversation **ONLY IF IT DOESN'T EXIST**
      conversation = new Message({ 
        participants: [senderId, receiverId], 
        messages: [] 
      });
    }

    // 🔹 Add the message to the conversation's messages array
    const newMessage = {
      text: message,
      time: new Date(),
      seen: false,
      sent: true,
      sender: senderId,
      receiver: receiverId
    };

    conversation.messages.push(newMessage);

    await conversation.save(); // Save the updated conversation

    // ✅ Ensure both users track this chat in `chats[]` (avoids duplicate empty records)
    await User.findByIdAndUpdate(senderId, { $addToSet: { chats: receiverId } });
    await User.findByIdAndUpdate(receiverId, { $addToSet: { chats: senderId } });

    res.status(201).json({ message: "Message saved successfully", newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Get a list of unique conversation users for a user



router.get("/:userId/:receiverId", async (req, res) => {
  try {
      const { userId, receiverId } = req.params;
      const { limit = 20, skip = 0 } = req.query; // Defaults: 20 messages per request

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
          return res.status(400).json({ error: "Invalid userId or receiverId format" });
      }

      const conversation = await Message.findOne({
          participants: { $all: [userId, receiverId] }
      });

      if (!conversation) {
          return res.json([]);
      }

      // Apply pagination on messages
      const paginatedMessages = conversation.messages
          .slice(-limit - skip, -skip || undefined); 

      res.json(paginatedMessages);
  } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
  }
});
router.put("/mark-seen/:userId/:receiverId", async (req, res) => {
  try {
      const { userId, receiverId } = req.params;

      const conversation = await Message.findOne({
          participants: { $all: [userId, receiverId] }
      });

      if (!conversation) return res.status(404).json({ error: "Conversation not found" });

      // Update unseen messages sent by receiver
      conversation.messages.forEach((msg) => {
          if (msg.receiver.toString() === userId && !msg.seen) {
              msg.seen = true;
          }
      });

      await conversation.save();
      res.json({ message: "Messages marked as seen" });
  } catch (error) {
      console.error("Error marking messages as seen:", error);
      res.status(500).json({ error: "Failed to update message status" });
  }
});



module.exports = router;
