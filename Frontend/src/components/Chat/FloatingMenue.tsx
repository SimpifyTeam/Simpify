import React, { useState } from "react";
import { Box, IconButton, Tooltip, Paper } from "@mui/material";
import { BarChart, Favorite, FlashOn, HelpOutline, Add } from "@mui/icons-material";
import { motion } from "framer-motion";

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: "fixed",
        bottom: 50,
        right: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {isOpen && (
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#2E2E2E",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Tooltip title="Chat Analysis">
            <IconButton sx={{ color: "#AA00FF" }}>
              <BarChart />
            </IconButton>
          </Tooltip>
          <Tooltip title="Rizz (Pickup Lines)">
            <IconButton sx={{ color: "#AA00FF" }}>
              <Favorite />
            </IconButton>
          </Tooltip>
          <Tooltip title="Conversation Kicker">
            <IconButton sx={{ color: "#AA00FF" }}>
              <FlashOn />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chatting Help">
            <IconButton sx={{ color: "#AA00FF" }}>
              <HelpOutline />
            </IconButton>
          </Tooltip>
        </Paper>
      )}

      {/* Toggle Button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          backgroundColor: "#AA00FF",
          color: "white",
          "&:hover": { backgroundColor: "#8800CC" },
        }}
      >
        <Add sx={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "0.2s" }} />
      </IconButton>
    </Box>
  );
};

export default FloatingMenu;
