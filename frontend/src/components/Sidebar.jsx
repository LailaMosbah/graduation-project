import React from "react";
import { useDatabase } from "../contexts/useDatabase";
import { Link, useLocation } from "react-router-dom";

// MUI components
import {
    Drawer, List, ListItemButton, ListItemText, ListItemIcon, Collapse, Divider, Toolbar, Box, Typography, Chip,
    Button,
} from "@mui/material";
import {
    ExpandLess, ExpandMore, Schema as SchemaIcon, TableChart as TableIcon, ViewColumn as ColumnIcon, Assessment as ReportsIcon, Settings as SettingsIcon, Folder as DatabaseIcon
} from "@mui/icons-material";

const drawerWidth = 280;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    // Get current path to know if i am in chat page or add database page
    const location = useLocation();
    const currentPath = location.pathname;

    const { databases } = useDatabase();
    const fakeData = databases;
    console.log("Databases in Sidebar:", fakeData);


    // #region DrawerConent
    const drawerContent = (
        <Box sx={{
            background: "linear-gradient(180deg, #f8fbff 0%, #f0f4f8 100%)",
            height: "100%",
            borderRight: "1px solid #e0e0e0",
            // pt: "3px"
        }}>
            {/* <Toolbar /> */}
            {mobileOpen ? <Toolbar /> : null}
            <Box sx={{ p: 2, pb: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <SchemaIcon />
                    Database Explorer
                </Typography>
                <Chip
                    label={`${fakeData.length} databases`}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1, fontSize: "0.7rem" }}
                />
            </Box>

            <Divider />

            <List sx={{ px: 1 }}>
                {/* Schemas Section */}
                <List component="div" disablePadding>
                    {fakeData.map((db) => (
                        <React.Fragment key={db.dbName}>
                            <ListItemButton
                                sx={{
                                    pl: 4,
                                    borderRadius: 2,
                                    mb: 0.5,
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    }
                                }}                                >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <DatabaseIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={db.dbName}
                                />
                            </ListItemButton>
                        </React.Fragment>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Button to Add a Databases (in Chat page) */}
                {currentPath === "/chat" && (
                    <>
                        <ListItemButton disableGutters disableRipple sx={{
                            justifyContent: "center", mt: 1,
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                            "&:focuse": {
                                backgroundColor: "transparent",
                            },
                            "&.Mui-selected, &:active": {
                                backgroundColor: "transparent",
                            },
                        }}>
                            <Link
                                to="/chat/addDatabase"
                                starticon={<DatabaseIcon />}
                                fullwidth={true}
                                style={{
                                    textDecoration: "none",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    background: "linear-gradient(135deg, #0A4DB3 0%, #3B82F6 100%)",
                                    color: "#fff",
                                    padding: "10px 0",
                                    borderRadius: "24px",
                                    fontWeight: "600",
                                    boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
                                    transition: "all 0.25s ease",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #0945A0 0%, #2563EB 100%)",
                                        boxShadow: "0 6px 20px rgba(59,130,246,0.4)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "scale(0.98)",
                                    },

                                }}
                            >
                                Add Database
                            </Link>
                        </ListItemButton>
                        <Divider sx={{ my: 2 }} />
                    </>
                )}



                {/* Reports */}
                {/* <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <ReportsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Reports"
                    />
                </ListItemButton> */}

                {/* <Divider sx={{ my: 2 }} /> */}

                {/* Settings */}
                {/* <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Settings"
                    />
                </ListItemButton> */}

            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
                        border: "none"
                    },
                }}
                open
            >
                {/* <h1>hi</h1> */}
                {drawerContent}
            </Drawer>
        </Box>
    );
}