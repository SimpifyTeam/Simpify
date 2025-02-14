import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
} from "@mui/material";
import { CameraAlt, Settings, History, Menu } from "@mui/icons-material";
import ChatWindow from "../components/Chat/ChatWindow";
import FloatingMenu from "../components/Chat/FloatingMenue";

const Chat: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<{ user: string; text?: string; image?: string }[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleSend = () => {
    if (inputText.trim()) {
      setChatHistory([...chatHistory, { user: "You", text: inputText }]);
      setInputText("");
    }
  };

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setChatHistory([...chatHistory, { user: "You", image: e.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#121212", minHeight: "100vh", color: "#E0E0E0" }}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1E1E1E", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" onClick={() => setIsDrawerOpen(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ color: "#7C4DFF" }}>
            Simpify
          </Typography>
          <IconButton color="inherit">
            <Avatar sx={{ bgcolor: "#7C4DFF" }}>U</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 280, backgroundColor: "#1E1E1E", height: "100%", paddingTop: 2 }}>
          <List>
            <ListItem component="button">
              <ListItemIcon>
                <History sx={{ color: "#7C4DFF" }} />
              </ListItemIcon>
              <ListItemText primary="History" sx={{ color: "#E0E0E0" }} />
            </ListItem>
            <ListItem component="button">
              <ListItemIcon>
                <Settings sx={{ color: "#7C4DFF" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: "#E0E0E0" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Chat Window */}
      <Box sx={{ flexGrow: 1, p: 3, marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ChatWindow chatHistory={chatHistory} />
        <Paper sx={{ display: "flex", gap: 2, padding: 2, backgroundColor: "#2E2E2E", borderRadius: 3, width: "70%", position: "fixed", bottom: 20, boxShadow: "0px 2px 10px rgba(0,0,0,0.2)" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            sx={{ input: { color: "#E0E0E0" }, backgroundColor: "#1E1E1E", borderRadius: 2 }}
          />
          <input accept="image/*" style={{ display: "none" }} id="screenshot-upload" type="file" onChange={handleScreenshotUpload} />
          <label htmlFor="screenshot-upload">
            <IconButton component="span" sx={{ color: "#7C4DFF" }}>
              <CameraAlt />
            </IconButton>
          </label>
          <Button variant="contained" onClick={handleSend} sx={{ backgroundColor: "#7C4DFF", borderRadius: 2, paddingX: 3 }}>
            Send
          </Button>
        </Paper>
      </Box>

      {/* Floating Menu */}
      <FloatingMenu />
    </Box>
  );
};

export default Chat;