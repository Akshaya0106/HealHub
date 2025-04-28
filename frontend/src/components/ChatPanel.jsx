import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://healhub-5by5.onrender.com");

const ChatPanel = ({ loggedInUserId, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      axios.get(`/messages/${loggedInUserId}/${selectedUser}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (
        (message.senderId === loggedInUserId && message.receiverId === selectedUser) ||
        (message.senderId === selectedUser && message.receiverId === loggedInUserId)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("updateMessageStatus", ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, seen: status === "seen" } : msg))
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateMessageStatus");
    };
  }, [selectedUser, loggedInUserId]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      senderId: loggedInUserId,
      receiverId: selectedUser,
      message: newMessage,
    };

    socket.emit("sendMessage", messageData);
    setMessages([...messages, { ...messageData, sent: true }]);
    setNewMessage("");
  };

  return (
    <div className="chat-panel">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.senderId === loggedInUserId ? "sent" : "received"}`}>
            {msg.message} {msg.seen ? "✔✔" : "✔"}
          </div>
        ))}
      </div>
      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPanel;
