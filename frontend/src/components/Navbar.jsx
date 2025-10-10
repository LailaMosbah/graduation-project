import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";

// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



export default function Navbar({ handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
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
              {user && (
                <div>
                  {user.username}
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="red"
                    bacgkgroundcolor="red"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem  ><Link to={"/profile"} style={{ textDecoration: "none", color: "inherit" }} >Profile</Link></MenuItem>
                    <MenuItem onClick={logout} sx={{ color: "red" }} >Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
}
