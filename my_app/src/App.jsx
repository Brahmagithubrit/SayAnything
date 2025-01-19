import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import MenuAppBar from "./MenuAppBar";
import SimpleInputCard from "./InputCard";
import { Alert, TextField, Button, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function App() {
  const [input, setInput] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const newSocket = io(`https://sayanything-backend.onrender.com/`);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server, socket ID:", newSocket.id);
    });

    newSocket.on("message", (msg) => {
      console.log("Received message from server:", msg);
      setMsgList((prev) => [...prev, msg]);

      if (msg.socketId !== newSocket.id) {
        handleNotification();
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
    <>
      {userName && (
        <div className="chat-app">
          <div className="header">
            <MenuAppBar userName={userName} />
          </div>
          {notification && (
            <div className="notification">
              <Alert
                severity="success"
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => setNotification("")}
                  >
                    x
                  </Button>
                }
              >
                New Message arrived, check it out!
              </Alert>
            </div>
          )}
          <div className="message-container">
            <Container maxWidth="sm">
              <ul className="message-list">
                {msgList.map((msg, index) => (
                  <li key={index}>
                    {` > `}
                    {msg.text}
                  </li>
                ))}
              </ul>
            </Container>
          </div>
          <div className="footer">
            <Box
              component="form"
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
              noValidate
              autoComplete="off"
            >
              <TextField
                className="input"
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                variant="outlined"
                fullWidth
              />
              <Button
                onClick={handleSend}
                variant="contained"
                color="info"
                className="send-button"
              >
                <SendIcon />
              </Button>
            </Box>
          </div>
        </div>
      )}

      {!userName && (
        <div>
          <SimpleInputCard userName={userName} setUserName={setUserName} />
        </div>
      )}
    </>
  );
}

// export const Info = ({ userName, setUserName }) => {
//   const [input, setInput] = useState("");
//   return (
//     <div className="InputName">
//       <TextField
//         className="input"
//         id="chat-input"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter Your Short Name"
//         variant="standard"
//         fullWidth
//       />
//       <Button
//         color="primary"
//         variant="contained"
//         onClick={() => {
//           setUserName(input);
//         }}
//       >
//         Set
//       </Button>
//     </div>
//   );
// };

export default App;
