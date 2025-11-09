import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";

// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import DatabaseIcon from "@mui/icons-material/Storage";

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
            width: { sm: `calc(100% - 280px)` },
            ml: { sm: `280px` },
            background: "linear-gradient(135deg, #094BB0 0%, #569CF9 100%)",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
            border: "none",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "70px"
          }}>
            {/* Menu Icon - Mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo/Brand */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1
            }}>
              <DatabaseIcon sx={{ fontSize: 28 }} />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #fff, #e3f2fd)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                PixelsDB
              </Typography>
              <Chip
                label="AI Powered"
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.7rem"
                }}
              />
            </Box>

            {/* User Menu */}
            <Box>
              {user && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    label={user.username}
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "rgba(255,255,255,0.3)",
                      fontWeight: "medium"
                    }}
                  />
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      '&:hover': {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 140,
                        borderRadius: 2,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      }
                    }}
                  >
                    <MenuItem>
                      <Link to={"/profile"} style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}>
                        👤 Profile
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={logout}
                      sx={{
                        color: "error.main",
                        fontWeight: "medium",
                        gap: 1
                      }}
                    >
                      🚪 Logout
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
}