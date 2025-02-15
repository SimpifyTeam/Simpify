// theme.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode: boolean) => {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#BB86FC" : "#6200EE", // Purple accent for dark mode, deep purple for light mode
      },
      secondary: {
        main: darkMode ? "#03DAC6" : "#018786", // Teal accent for dark mode, darker teal for light mode
      },
      background: {
        default: darkMode ? "#121212" : "#F5F5F5", // Dark background for dark mode, light gray for light mode
        paper: darkMode ? "#1E1E1E" : "#FFFFFF", // Slightly lighter dark for dark mode, white for light mode
      },
      text: {
        primary: darkMode ? "#E0E0E0" : "#000000", // Light text for dark mode, dark text for light mode
        secondary: darkMode ? "#A0A0A0" : "#555555", // Gray text for dark mode, darker gray for light mode
      },
    },
    transitions: {
      duration: {
        short: 300, // Smooth transitions for animations
      },
    },
  });
};