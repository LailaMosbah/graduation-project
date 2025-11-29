import React, { useState } from "react";

// Components
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import AddDatabase from "../components/Forms/AddDatabase.jsx";

// Material UI
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import AddDatabaseV2 from "../components/Forms/AddDatabaseV2.jsx";


export default function AddDatabasePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa  0%, #e4edf5  100%)",
      }}
    >
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: { sm: `calc(100% - 280px)` },
          ml: { sm: `280px` },
          // mt: '70px'
        }}
      >
        <Toolbar />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            // height: "calc(100vh - 140px)",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Box
            sx={{
              flex: { xs: 1, lg: 1 },
              minWidth: { lg: 400 },
            }}
          >
            {/* <AddDatabase /> */}
            {/* <AddDatabaseV2 /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
