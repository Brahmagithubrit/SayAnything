import React, { useState } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState("");
  const handleSend = () => {
    if (socket) {
      console.log("Sending message:", input);
      socket.emit("message", { text: input, socketId: socket.id });
      setInput("");
    } else {
      console.error("Socket is not connected");
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "Red",
          height: 200,
          width: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        Hello World
      </div>
      <div>
        <div
          style={{ background: "gray", padding: "10px", marginBottom: "10px" }}
        >
          <ul>
            {msgList.map((msg, index) => (
              <li key={index}>{msg.text}</li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
        {notification && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <strong>{notification}</strong>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
