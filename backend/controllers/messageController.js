const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();
        
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Error sending message" });
    }
};

// Get all messages between two users
exports.getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};
