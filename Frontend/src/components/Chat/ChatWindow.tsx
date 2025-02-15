import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface ChatWindowProps {
  chatHistory: Array<{ user: string; text?: string; image?: string }>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatHistory }) => {
  return (
    <Box sx={{ height: "70vh", overflowY: "auto", p: 2 }}>
      {chatHistory.map((chat, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: chat.user === "You" ? "flex-end" : "flex-start",
            mb: 2,
          }}
        >
          <Paper
            sx={{
              p: 2,
              maxWidth: "70%",
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: chat.user === "You" ? "#0078FF" : "#E0E0E0",
              color: chat.user === "You" ? "#FFFFFF" : "#000000",
              borderTopRightRadius: chat.user === "You" ? 0 : 16,
              borderTopLeftRadius: chat.user === "You" ? 16 : 0,
            }}
          >
            {chat.image ? (
              <img
                src={chat.image}
                alt="screenshot"
                style={{
                  maxWidth: "100%",
                  borderRadius: 8,
                  display: "block",
                }}
              />
            ) : (
              <Typography variant="body1">{chat.text}</Typography>
            )}
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatWindow;
