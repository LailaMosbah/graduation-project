import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomPage/WelcomePage";
import LoginForm from "./components/Forms/LoginForm";
import SignupForm from "./components/Forms/SignupForm";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
// Matrial UI
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // الأبيض
    },
    text: {
      primary: "#000000", // الأسود للنصوص
    },
  },
});

function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
