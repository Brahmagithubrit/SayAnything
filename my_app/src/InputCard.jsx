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

export default function SimpleInputCard({ userName, setUserName }) {
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

  const handleSubmit = () => {
    if (adminNameNotTaken(input)) {
      console.log("Input submitted:", input);
      setUserName(input);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card elevation={3} sx={{ width: "100%", maxWidth: 400 }}>
            <CardContent>
              <Typography
                component="h1"
                variant="h5"
                align="center"
                gutterBottom
              >
                Welcome
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                gutterBottom
              >
                Please provide your short name to proceed
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="input"
                  label="Name"
                  name="input"
                  autoFocus
                  value={input}
                  onChange={handleInputChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Process
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
