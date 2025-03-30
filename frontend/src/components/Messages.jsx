import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../utils/socket";

const Messages = ({ selectedChat, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:5000/messages/${selectedChat.chatId}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
  
    const messageData = {
      senderId: userId,
      receiverId: selectedChat.receiverId,
      message: newMessage,
      conversationId: selectedChat.chatId, // Ensure conversation ID is passed
    };
  
    try {
      const res = await axios.post("http://localhost:5000/messages", messageData);
      const sentMessage = res.data.newMessage;
  
      setMessages((prev) => [...prev, sentMessage]); // Update UI instantly
      setNewMessage("");
  
      socket.emit("sendMessage", sentMessage); // Emit message to other users
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  return (
    <div className="messages">
      <h2>Chat with {selectedChat.name}</h2>
      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={msg._id} className={`message ${msg.senderId === userId ? "sent" : "received"}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
