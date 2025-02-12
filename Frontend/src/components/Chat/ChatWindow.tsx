import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface ChatWindowProps {
  chatHistory: Array<{ user: string; text?: string; image?: string }>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatHistory }) => {
  return (
    <Box sx={{ height: "70vh", overflowY: "auto", mb: 2 }}>
      {chatHistory.map((chat, index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: chat.user === "You" ? "flex-end" : "flex-start", mb: 2 }}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: chat.user === "You" ? "#7C4DFF" : "#4A148C",
              color: "#E0E0E0",
              maxWidth: "70%",
              borderRadius: chat.user === "You" ? "20px 20px 0 20px" : "20px 20px 20px 0",
            }}
          >
            {chat.image ? (
              <img src={chat.image} alt="screenshot" style={{ maxWidth: "100%", borderRadius: "10px" }} />
            ) : (
              <Typography>{chat.text}</Typography>
            )}
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatWindow;