// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#094BB0",
      light: "#569CF9",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      default: "black",
      main: "#ffffff",
      light: "#757575",
      secondary: "#757575",
      disabled: "#BDBDBD",
    },
    // لو عايزة ألوان مخصصة إضافية:
    tertiary: {
      main: "#00bfa5",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
        },
      },
      // إضافة variant مخصص ممكن هنا (انتبهي للـ TS تحتاج augmentation)
    },
  },
});

export default theme;
