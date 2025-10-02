import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages & Components
import WelcomePage from "./pages/WelcomPage/WelcomePage";
import SignupPage from "./pages/FormsPage/SignupPage";
import LoginPage from "./pages/FormsPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
// Matrial UI
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme/theme";
import CssBaseline from '@mui/material/CssBaseline';
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";



function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
