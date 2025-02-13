// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import "./App.css";
// import Box from "@mui/material/Box";
// import SendIcon from "@mui/icons-material/Send";
// import PrivacyPolicy from "./Privacy";
// import MenuAppBar from "./MenuAppBar";
// import SimpleInputCard from "./InputCard";
// import { Alert, TextField, Button, Container } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import axios from "axios";
// import SignUp from "./SignUp";

// function App() {
//   const [input, setInput] = useState("");
//   const [msgList, setMsgList] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [notification, setNotification] = useState("");
//   const [userName, setUserName] = useState("");
//   const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   useEffect(() => {
//     if (acceptedPrivacy) {
//       fetchMessages();
//       const newSocket = io("http://localhost:5000"); // Fix: corrected the socket reference
//       setSocket(newSocket);

//       newSocket.on("connect", () => {
//         console.log("Connected to server, socket ID:", newSocket.id);
//       });

//       newSocket.on("message", (msg) => {
//         console.log("Received message from server:", msg);
//         setMsgList((prev) => [...prev, msg]);

//         if (msg.socketId !== newSocket.id) {
//           handleNotification();
//         }
//       });

//       newSocket.on("disconnect", () => {
//         console.log("Disconnected from server");
//       });

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [acceptedPrivacy]);

//   const handleLogin = (userInfo) => {
//     if (userInfo.name === "Brahmananda Tosh") {
//       setUserName("Admin");
//     }
//     setIsSignedIn(true);
//   };

//   const handleNotification = () => {
//     if (!notification) {
//       setNotification("A new message arrived, check it out!");
//       setTimeout(() => {
//         setNotification("");
//       }, 3000);
//     }
//   };

//   const handleSend = () => {
//     if (socket) {
//       console.log("Sending message:", input);
//       socket.emit("message", {
//         userName: userName,
//         text: input,
//         socketId: socket.id,
//       });
//       handleMessageStore(input);
//       setInput("");
//     } else {
//       console.error("Socket is not connected");
//     }
//   };

//   const handleMessageStore = async (message) => {
//     const Data_to_store = {
//       userName: userName,
//       text: message,
//       time: Date.now(),
//     };
//     try {
//       await axios.post(`http://localhost:5000/StoreChat`, Data_to_store);
//       console.log("Message stored successfully");
//     } catch (error) {
//       console.error("Error storing chat:", error.message);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/GetChats`);
//       const { data } = response;
//       setMsgList((prev) => [
//         ...prev,
//         ...data.map((msg) => ({
//           ...msg,
//           userName: msg.userName || "Unknown🤔",
//           time: msg.time || Date.now(),
//         })),
//       ]);
//     } catch (error) {
//       console.error("Error fetching messages:", error.message);
//     }
//   };

//   return (
//     <>
//       {!acceptedPrivacy && (
//         <Dialog open={!acceptedPrivacy} disableBackdropClick>
//           <DialogTitle>Privacy Notice</DialogTitle>
//           <DialogContent>
//             <Typography>
//               <PrivacyPolicy />
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => setAcceptedPrivacy(true)}
//               variant="contained"
//               color="primary"
//             >
//               Accept & Continue
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {acceptedPrivacy && !isSignedIn && <SignUp onLogin={handleLogin} />}

//       {acceptedPrivacy && isSignedIn && !userName && (
//         <div>
//           <SimpleInputCard userName={userName} setUserName={setUserName} />
//         </div>
//       )}

//       {acceptedPrivacy && isSignedIn && userName && (
//         <div className="chat-app">
//           <div className="header">
//             <MenuAppBar userName={userName} />
//           </div>
//           <Card className="chat-server-card">
//             <CardContent>
//               <Typography className="rough" variant="h5" component="div">
//                 Our Chat Server
//               </Typography>
//             </CardContent>
//           </Card>
//           {notification && (
//             <div className="notification">
//               <Alert
//                 severity="success"
//                 iconMapping={{
//                   success: <CheckCircleOutlineIcon fontSize="inherit" />,
//                 }}
//                 action={
//                   <Button
//                     color="inherit"
//                     size="small"
//                     onClick={() => setNotification("")}
//                   >
//                     x
//                   </Button>
//                 }
//               >
//                 New Message arrived, check it out!
//               </Alert>
//             </div>
//           )}
//           <div className="message-container">
//             <Container maxWidth="sm">
//               <ul className="message-list">
//                 {msgList?.map((msg, index) => (
//                   <li
//                     key={index}
//                     className={`chat-message ${
//                       msg.userName === userName ? "right" : "left"
//                     }`}
//                   >
//                     <div className="message-header">
//                       <span className="message-username">{msg.userName}</span>
//                       <span className="message-time">
//                         {!msg.time
//                           ? "now"
//                           : Date.now() - msg.time <= 60000
//                             ? "within 1 minute"
//                             : new Date(msg.time).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <div className="message-text">{msg.text}</div>
//                   </li>
//                 ))}
//               </ul>
//             </Container>
//           </div>
//           <div className="footer">
//             <Box
//               component="form"
//               sx={{ display: "flex", alignItems: "center", width: "100%" }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 className="input"
//                 id="chat-input"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message"
//                 variant="outlined"
//                 fullWidth
//               />
//               <Button
//                 onClick={handleSend}
//                 variant="contained"
//                 color="info"
//                 className="send-button"
//               >
//                 <SendIcon />
//               </Button>
//             </Box>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import PrivacyPolicy from "./Privacy";
import MenuAppBar from "./MenuAppBar";
import SimpleInputCard from "./InputCard";
import { Alert, TextField, Button, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import axios from "axios";
import SignUp from "./SignUp";

function App() {
  const [input, setInput] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState("");
  const [userName, setUserName] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", actualName: "" });

  useEffect(() => {
    if (acceptedPrivacy) {
      fetchMessages();
      const newSocket = io("https://sayanything-backend.onrender.com");
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
    }
  }, [acceptedPrivacy]);

  const handleLogin = (userInfo) => {
    const { email, name } = userInfo;
    setUserDetails({ email, actualName: name });
    if (name === "Brahmananda Tosh") {
      setUserName("Admin");
    }
    setIsSignedIn(true);
  };

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
      socket.emit("message", {
        userName: userName,
        text: input,
        socketId: socket.id,
      });
      handleMessageStore(input);
      setInput("");
    } else {
      console.error("Socket is not connected");
    }
  };

  const handleMessageStore = async (message) => {
    const Data_to_store = {
      userName: userName,
      text: message,
      time: Date.now(),
    };
    try {
      await axios.post(
        `https://sayanything-backend.onrender.com/StoreChat`,
        Data_to_store
      );
      console.log("Message stored successfully");
    } catch (error) {
      console.error("Error storing chat:", error.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://sayanything-backend.onrender.com/GetChats`
      );
      const { data } = response;
      setMsgList((prev) => [
        ...prev,
        ...data.map((msg) => ({
          ...msg,
          userName: msg.userName || "Unknown🤔",
          time: msg.time || Date.now(),
        })),
      ]);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  return (
    <>
      {!acceptedPrivacy && (
        <Dialog open={!acceptedPrivacy} disableBackdropClick>
          <DialogTitle>Privacy Notice</DialogTitle>
          <DialogContent>
            <Typography>
              <PrivacyPolicy />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setAcceptedPrivacy(true)}
              variant="contained"
              color="primary"
            >
              Accept & Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {acceptedPrivacy && !isSignedIn && <SignUp onLogin={handleLogin} />}

      {acceptedPrivacy && isSignedIn && !userName && (
        <div>
          <SimpleInputCard
            userName={userName}
            setUserName={setUserName}
            email={userDetails.email}
            actualName={userDetails.actualName}
          />
        </div>
      )}

      {acceptedPrivacy && isSignedIn && userName && (
        <div className="chat-app">
          <div className="header">
            <MenuAppBar userName={userName} />
          </div>
          <Card className="chat-server-card">
            <CardContent>
              <Typography className="rough" variant="h5" component="div">
                Our Chat Server
              </Typography>
            </CardContent>
          </Card>
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
                {msgList?.map((msg, index) => (
                  <li
                    key={index}
                    className={`chat-message ${
                      msg.userName === userName ? "right" : "left"
                    }`}
                  >
                    <div className="message-header">
                      <span className="message-username">{msg.userName}</span>
                      <span className="message-time">
                        {!msg.time
                          ? "now"
                          : Date.now() - msg.time <= 60000
                            ? "within 1 minute"
                            : new Date(msg.time).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="message-text">{msg.text}</div>
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
    </>
  );
}

export default App;
