import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ loggedInUserId, selectUser }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`/messages/${loggedInUserId}`);
        const uniqueUsers = response.data.reduce((acc, msg) => {
          const otherUser = msg.senderId === loggedInUserId ? msg.receiverId : msg.senderId;
          if (!acc.some((c) => c.userId === otherUser)) {
            acc.push({ userId: otherUser, lastMessage: msg.message });
          }
          return acc;
        }, []);
        setConversations(uniqueUsers);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [loggedInUserId]);

  return (
    <div className="sidebar">
      {conversations.map((conv) => (
        <div key={conv.userId} onClick={() => selectUser(conv.userId)}>
          {conv.userId}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
