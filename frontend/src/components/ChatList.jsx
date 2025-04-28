import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatList = ({ setSelectedChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios.get("https://healhub-5by5.onrender.com/auth/");
      setChats(res.data);
    };

    fetchChats();
  }, []);

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      {chats.map((chat) => (
        <div key={chat.chatId} onClick={() => setSelectedChat(chat)} className="chat-item">
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
