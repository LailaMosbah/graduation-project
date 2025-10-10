import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages & Components
import WelcomePage from "./pages/WelcomePage.jsx";
import SignupPage from "./pages/FormsPage/SignupPage";
import LoginPage from "./pages/FormsPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ChatPage from "./pages/ChatPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

// Contexts
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DatabaseProvider } from "./contexts/DatabaseContext.jsx";

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
        <AuthProvider>
          <DatabaseProvider>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/chat" element={<ProtectedRoute ><ChatPage /> </ProtectedRoute >} />
              <Route path="/profile" element={<ProtectedRoute ><ProfilePage /> </ProtectedRoute >} />
              <Route path="*" element={<><h1>NOT FOUND 404</h1></>} />
            </Routes>
          </DatabaseProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
