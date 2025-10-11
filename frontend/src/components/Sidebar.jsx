import React, { useState } from "react";
import { useDatabase } from "../contexts/useDatabase";

// MUI components
import {
    Drawer, List, ListItemButton, ListItemText, ListItemIcon, Collapse, Divider, Toolbar, Box, Typography, Chip,
} from "@mui/material";
import {
    ExpandLess,
    ExpandMore,
    Schema as SchemaIcon,
    TableChart as TableIcon,
    ViewColumn as ColumnIcon,
    Assessment as ReportsIcon,
    Settings as SettingsIcon,
    Folder as DatabaseIcon
} from "@mui/icons-material";

const drawerWidth = 280;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const [openSchemas, setOpenSchemas] = useState(true);
    const [openDb, setOpenDb] = useState({});
    const [openTable, setOpenTable] = useState({});

    const { databases } = useDatabase();
    const fakeData = databases;

    const handleDbClick = (dbName) => {
        setOpenDb(prev => ({ ...prev, [dbName]: !prev[dbName] }));
    };

    const handleTableClick = (tableName) => {
        setOpenTable(prev => ({ ...prev, [tableName]: !prev[tableName] }));
    };

    const drawerContent = (
        <Box sx={{
            background: "linear-gradient(180deg, #f8fbff 0%, #f0f4f8 100%)",
            height: "100%",
            borderRight: "1px solid #e0e0e0"
        }}>
            <Toolbar />
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
                <ListItemButton
                    onClick={() => setOpenSchemas(!openSchemas)}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            '& .MuiListItemIcon-root': {
                                color: 'primary.contrastText'
                            }
                        }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <DatabaseIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Schemas"
                    />
                    {openSchemas ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openSchemas} timeout="auto" unmountOnExit>
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
                                    }}
                                    onClick={() => handleDbClick(db.dbName)}
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <DatabaseIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={db.dbName}
                                    />
                                    <Chip
                                        label={db.tables.length}
                                        size="small"
                                        sx={{ height: 20, fontSize: '0.6rem' }}
                                    />
                                    {openDb[db.dbName] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={openDb[db.dbName]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {db.tables.map((table) => (
                                            <React.Fragment key={table.tableName}>
                                                <ListItemButton
                                                    sx={{
                                                        pl: 6,
                                                        borderRadius: 2,
                                                        mb: 0.5,
                                                        '&:hover': {
                                                            backgroundColor: 'action.hover',
                                                        }
                                                    }}
                                                    onClick={() => handleTableClick(table.tableName)}
                                                >
                                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                                        <TableIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={table.tableName}
                                                    />
                                                    {openTable[table.tableName] ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>

                                                <Collapse in={openTable[table.tableName]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {table.columns.map((col) => (
                                                            <ListItemButton
                                                                key={col}
                                                                sx={{
                                                                    pl: 8,
                                                                    borderRadius: 2,
                                                                    mb: 0.2,
                                                                    minHeight: 32
                                                                }}
                                                            >
                                                                <ListItemIcon sx={{ minWidth: 28 }}>
                                                                    <ColumnIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={col}
                                                                />
                                                            </ListItemButton>
                                                        ))}
                                                    </List>
                                                </Collapse>
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </List>
                </Collapse>

                <Divider sx={{ my: 2 }} />

                {/* Reports */}
                <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <ReportsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Reports"
                    />
                </ListItemButton>

                <Divider sx={{ my: 2 }} />

                {/* Settings */}
                <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Settings"
                    />
                </ListItemButton>
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
                        boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
                        border: "none"
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}