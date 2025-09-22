import React from "react";

// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ handleDrawerToggle }) {
  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 240px)` }, // خصم مساحة الـ Sidebar في الشاشات الكبيرة
            ml: { sm: `240px` }, // margin-left للـ AppBar عشان ميغطيش على الـ sidebar
            bgcolor: "white",
            color: "black",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Menu Icon - يظهر فقط في الموبايل */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" }, // يختفي في الشاشات الكبيرة
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* العنوان أو اللوجو - ممكن تضيفي اسم المشروع */}
            <Box sx={{ flexGrow: 1 }}>
              PixelsDB
            </Box>

            {/* Login & Signup - يفضلوا في أقصى اليمين */}
            <Box>
              <Button color="inherit">Signup</Button>
              <Button color="inherit">Login</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
}
