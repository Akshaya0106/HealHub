import { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([
    { sender: "You", text: "Hello!", time: "10:30 AM" },
    { sender: "Provider", text: "Hi! How can I help?", time: "10:31 AM" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "You", text: input, time: "Now" }]);
    setInput("");
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar */}
      <div className="col-3 bg-light p-3 border-end">
        <h4>Chats</h4>
        <ul className="list-group">
          <li className="list-group-item active">Provider 1</li>
          <li className="list-group-item">Provider 2</li>
        </ul>
      </div>

      {/* Chat Window */}
      <div className="col-9 d-flex flex-column">
        <div className="bg-primary text-white p-3">
          <h5>Chat with Provider</h5>
        </div>

        <div className="flex-grow-1 p-3 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === "You" ? "text-end" : ""}`}>
              <span className="badge bg-secondary">{msg.sender}</span>
              <p className={`d-inline-block p-2 rounded ${msg.sender === "You" ? "bg-success text-white" : "bg-light"}`}>
                {msg.text}
              </p>
              <small className="d-block text-muted">{msg.time}</small>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 border-top d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
