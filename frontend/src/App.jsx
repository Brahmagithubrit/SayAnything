import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  // const [input, setInput] = useState("");
  // const [msgList, setMsgList] = useState([]);
  // const [socket, setSocket] = useState(null);
  // const [notification, setNotification] = useState("");

  // useEffect(() => {
  //   // const backend_url = import.meta.env.VITE_API_URL;
  //   // const newSocket = io(`${backend_url}`);
  //   // setSocket(newSocket);

  //   newSocket.on("connect", () => {
  //     console.log("Connected to server, socket ID:", newSocket.id);
  //   });

  //   newSocket.on("message", (msg) => {
  //     console.log("Received message from server:", msg);
  //     setMsgList((prev) => [...prev, msg]);

  //     if (msg.socketId !== newSocket.id) {
  //       handleNotification();
  //     }
  //   });

  //   newSocket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  const handleNotification = () => {
    if (!notification) {
      setNotification("A new message arrived, check it out!");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

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
  );
}

export default App;
