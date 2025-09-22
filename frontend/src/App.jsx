import "./App.css";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <Navbar handleDrawerToggle={handleDrawerToggle} />
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

          {/* هنا هيبقى المحتوى الأساسي */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* عشان تسيب مساحة للـ Navbar فوق */}
            <Toolbar />
            <h1>Welcome to PixelsDB 👋</h1>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
