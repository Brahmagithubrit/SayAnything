import * as React from "react";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";

const theme = createTheme();

export default function SimpleInputCard({
  userName,
  setUserName,
  email,
  actualName,
}) {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const adminNameNotTaken = (input) => {
    if (input.toLowerCase().includes("brahma")) {
      alert("You cannot take admin name😊 , choose another name ");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (adminNameNotTaken(input)) {
      console.log("Input submitted:", input);
      setUserName(input);

      const userData = {
        userName: input,
        email: email,
        actualName: actualName,
      };

      try {
        const response = await fetch(
          "https://sayanything-backend.onrender.com/storeUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit data to the backend");
        }

        const result = await response.json();
        console.log("Backend response:", result);
        // alert("Your data has been submitted successfully!");
      } catch (error) {
        console.error("Error submitting data:", error);
        // alert("There was an error submitting your data. Please try again.");
      }
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            padding: "2rem",
          }}
        >
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5">Enter Your Name</Typography>
              <Typography variant="body2" color="textSecondary">
                {`You are logged in as ${actualName} (${email})`}
              </Typography>
            </CardContent>
          </Card>
          <TextField
            sx={{
              marginTop: 2,
              marginBottom: 2,
              width: "100%",
            }}
            label="Enter your username"
            variant="outlined"
            value={input}
            onChange={handleInputChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
