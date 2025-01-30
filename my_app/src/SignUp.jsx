import React, { useEffect } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function SignUp({ onLogin }) {
  console.log(clientId);
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signup-button"),
      { theme: "filled_blue", size: "large", width: "100%" }
    );
  }, []);

  const handleGoogleLogin = (response) => {
    const credential = response.credential;
    const userInfo = JSON.parse(atob(credential.split(".")[1]));
    onLogin(userInfo);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          boxShadow: 10,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome to My Platform
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sign up using Google to get started.
          </Typography>

          <Box
            id="google-signup-button"
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          />

          <Typography variant="body2" color="text.secondary" mt={2}>
            You can only sign up using Google for now.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Sign Up with Google ☝️
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
