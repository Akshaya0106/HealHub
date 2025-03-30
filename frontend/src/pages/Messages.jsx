import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatUsers, setChatUsers] = useState({});
  const [userChats, setUserChats] = useState([]);

  const chatBoxRef = useRef(null);
  const messageInputRef = useRef(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user._id : null;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlReceiverId = queryParams.get("receiver");

  useEffect(() => {
    const fetchUserChats = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/auth/${userId}/chats`);
        setUserChats(res.data);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    };
    fetchUserChats();

    const interval = setInterval(fetchUserChats, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      const userDetails = {};
      for (const chatId of userChats) {
        try {
          const res = await axios.get(`http://localhost:5000/messages/users/${chatId}`);
          userDetails[chatId] = res.data;
        } catch (error) {
          console.error(`Error fetching user ${chatId}:`, error);
        }
      }
      setChatUsers(userDetails);
    };
    if (userChats.length) fetchChatUsers();
  }, [userChats]);
  useEffect(() => {
    if (urlReceiverId) {
      setSelectedChat({ chatId: urlReceiverId, receiverId: urlReceiverId });
    }
  }, [urlReceiverId]);
  
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/messages/${userId}/${selectedChat.chatId}`);
        setMessages(res.data);

        // Check if the last message is received and mark it as seen
        if (res.data.length > 0) {
          const lastMessage = res.data[res.data.length - 1];
          if (lastMessage.sender !== userId && !lastMessage.seen) {
            await axios.put(`http://localhost:5000/messages/mark-seen/${userId}/${selectedChat.chatId}`);
            setMessages((prevMessages) =>
              prevMessages.map((msg) => ({ ...msg, seen: true }))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  const markMessageAsSeen = async (messageId) => {
    try {
      await axios.patch(`http://localhost:5000/messages/${messageId}/seen`);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, seen: true } : msg
        )
      );
    } catch (error) {
      console.error("Error marking message as seen:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    try {
      const messageData = {
        senderId: userId,
        receiverId: selectedChat.receiverId || selectedChat.chatId,
        message: newMessage,
        conversationId: selectedChat.chatId,
      };
      const res = await axios.post("http://localhost:5000/messages", messageData);
      setMessages((prevMessages) => [...prevMessages, { ...res.data, seen: false }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
    <Navbar/>
<div className="container-fluid vh-100 d-flex">
  <div className="row flex-grow-1 w-100">
    {/* Sidebar: Chat List */}
    <div className="col-md-4 border-end p-3 overflow-auto bg-light" style={{ maxHeight: "100vh" }}>
      <h4 className="fw-bold mb-3">Chats</h4>
      <ul className="list-group">
        {userChats.map((chatId, index) => (
          <li
            key={index}
            onClick={() => setSelectedChat({ chatId, receiverId: chatUsers[chatId]?.receiverId })}
            className={`list-group-item list-group-item-action d-flex align-items-center p-3 ${
              selectedChat?.chatId === chatId ? "active bg-primary text-white" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <FaUserCircle size={30} className="me-2" />
            <div>
              <span className="fw-bold">{chatUsers[chatId]?.name || "Loading..."}</span>
              <small className="text-muted d-block">{chatUsers[chatId]?.role}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Chat Panel */}
    <div className="col-md-8 d-flex flex-column p-3">
      {selectedChat || urlReceiverId ? (
        <>
          {/* Chat Header */}
          <div className="bg-primary text-white p-3 d-flex align-items-center" style={{borderRadius:"50px",height:"60px"}}>
            <FaUserCircle size={35} className="me-2" />
            <h5 className="m-0">{chatUsers[selectedChat?.chatId]?.name || "Unknown"}</h5>
          </div>

          {/* Chat Messages */}
          <div ref={chatBoxRef} className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: "75vh" }}>
            {messages.map((msg, index) => {
              const isSentByUser = msg.sender === userId;
              const isLastMessage = index === messages.length - 1;
              return (
                <div key={msg._id} className={`mb-2 d-flex ${isSentByUser ? "justify-content-end" : "justify-content-start"}`}>
                  <span
                    className={`p-3 rounded d-inline-block shadow-sm ${
                      isSentByUser ? "bg-primary text-white" : "bg-light text-dark"
                    }`}
                    style={{ maxWidth: "60%", wordBreak: "break-word", borderRadius: "20px" }}
                  >
                    <small className="d-block fw-bold">{isSentByUser ? "You" : chatUsers[selectedChat?.chatId]?.name || "Unknown"}</small>
                    {msg.text}
                    {isLastMessage && (
                      <span className="ms-2 small text-muted d-block text-end">
                        {msg.seen ? "Seen" : "Sent"}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="mt-3 d-flex">
            <input
              ref={messageInputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="form-control"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="btn btn-primary ms-2">Send</button>
          </div>
        </>
      ) : (
        <p className="text-center text-muted">Select a conversation to start messaging.</p>
      )}
    </div>
  </div>
</div>
<Footer/>
</>

  );
};

export default Messages;
