import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Box from "@mui/material/Box";
import {
  Alert,
  CssBaseline,
  TextField,
  Button,
  Container,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


function App() {
  const [input, setInput] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // const backend_url = import.meta.env.VITE_API_URL;
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
      <div>
        {notification && (
          <div className="notification">
            <Alert
              severity="success"
              iconMapping={{
                success: <CheckCircleOutlineIcon fontSize="inherit" />,
              }}
              action={
                <Button color="inherit" size="small">
                  x
                </Button>
              }
            >
              New Message arrive , check it out !
            </Alert>
          </div>
        )}
        <div className="container">
          <Container maxWidth="sm">
            <ul>
              {msgList.map((msg, index) => (
                <li key={index}>{msg.text}</li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
      <div className="foot">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="on"
        >
          <TextField
            id="filled-basic"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Type Message"
            variant="standard"
          />
        </Box>
        <Button onClick={handleSend} variant="contained">
          Send
        </Button>
      </div>
    </>
  );
}

export default App;
