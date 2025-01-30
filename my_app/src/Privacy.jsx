import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const PrivacyPolicy = () => {
  const handleAgree = () => {
    alert("Thanks for agreeing! Remember, kindness wins! ✌️");
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 2,
        textAlign: "center",
      }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          padding: 2,
          backgroundColor: "#f7f7f7",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
          >
            Chat App Privacy & Behavior Policy 🛡️
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "#555", lineHeight: 1.6 }}
          >
            Welcome to our chat app! 🎉 Before you jump into the fun, we’d like
            to lay down some ground rules. Don’t worry, they’re simple: be cool,
            be kind, and don’t make us call your mom. 😉
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            1️⃣ No Offensive Words, Please 🛑
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is a no-troll zone! Keep your language clean and your tone
            respectful. If you feel the urge to be rude, take a deep breath and
            pet a cat instead. 🐱
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            2️⃣ No Threats 🚨
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is a chat app, not a courtroom or a soap opera. Leave the legal
            threats and drama for your favorite TV show. Let’s keep it fun,
            shall we? 📺
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            3️⃣ Respect Everyone 🙌
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Be excellent to each other. Period. Whether you’re chatting with a
            stranger or your bestie, treat everyone with respect and kindness.
            Karma is watching. 👀
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
            Violators will face the ultimate punishment: getting banned faster
            than you can say "I’m sorry." 🚫
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#d32f2f" }}>
            🚨 <strong>Legal Notice:</strong> Any violent, abusive, or unlawful
            behavior will result in an immediate ban and may be reported to the
            relevant authorities for further legal action. We take the safety of
            our users very seriously. ⚖️
          </Typography>
          
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrivacyPolicy;
