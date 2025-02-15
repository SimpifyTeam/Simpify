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
  ThemeProvider,
} from "@mui/material";
import { CameraAlt, Settings, History, Menu, Brightness4, Brightness7 } from "@mui/icons-material";
import { getTheme } from "../css/theme"; // Import the theme
import ChatWindow from "../components/Chat/ChatWindow";

// Define the type for chat history items
type ChatHistoryItem = {
  user: string;
  text?: string;
  image?: string;
};

const Chat: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Get the theme based on darkMode state
  const theme = getTheme(darkMode);

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
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", backgroundColor: theme.palette.background.default, minHeight: "100vh", color: theme.palette.text.primary }}>
        <CssBaseline />
        {/* Header */}
        <AppBar position="fixed" sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "none", transition: "background-color 0.3s ease" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton edge="start" color="inherit" onClick={() => setIsDrawerOpen(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: "bold", letterSpacing: "1px" }}>
              Simpify
            </Typography>
            <Box>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)} sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)" } }}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton color="inherit">
                <Avatar sx={{ bgcolor: theme.palette.primary.main, transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)" } }}>U</Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Box sx={{ width: 280, backgroundColor: theme.palette.background.paper, height: "100%", paddingTop: 2, transition: "background-color 0.3s ease" }}>
            <List>
              <ListItem sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                <ListItemIcon>
                  <History sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="History" sx={{ color: theme.palette.text.primary }} />
              </ListItem>
              <ListItem sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                <ListItemIcon>
                  <Settings sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ color: theme.palette.text.primary }} />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Chat Window */}
        <Box sx={{ flexGrow: 1, p: 3, marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ChatWindow chatHistory={chatHistory} />
          <Paper
            sx={{
              display: "flex",
              gap: 2,
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              width: "70%",
              position: "fixed",
              bottom: 20,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0px 4px 20px rgba(0,0,0,0.3)" },
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{
                input: { color: theme.palette.text.primary },
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                transition: "background-color 0.3s ease",
              }}
            />
            <input accept="image/*" style={{ display: "none" }} id="screenshot-upload" type="file" onChange={handleScreenshotUpload} />
            <label htmlFor="screenshot-upload">
              <IconButton component="span" sx={{ color: theme.palette.primary.main, transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)" } }}>
                <CameraAlt />
              </IconButton>
            </label>
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
                paddingX: 3,
                transition: "transform 0.3s ease, background-color 0.3s ease",
                "&:hover": { backgroundColor: theme.palette.primary.dark, transform: "scale(1.05)" },
              }}
            >
              Send
            </Button>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;