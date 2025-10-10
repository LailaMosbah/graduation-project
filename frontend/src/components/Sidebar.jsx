import React, { useState } from "react";
import { useDatabase } from "../contexts/useDatabase";

// MUI components
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
    Toolbar,
    Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 240;



export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const [openSchemas, setOpenSchemas] = useState(false);
    const [openDb, setOpenDb] = useState({});
    const [openTable, setOpenTable] = useState({});

    // Fake data for demonstration
    const { databases } = useDatabase();
    const fakeData = databases; // Use actual data from context

    const drawerContent = (
        <div>
            <Toolbar />
            <List>
                {/* Schemas */}
                <ListItemButton onClick={() => setOpenSchemas(!openSchemas)}>
                    <ListItemText primary="Schemas" />
                    {openSchemas ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSchemas} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {fakeData.map((db) => (
                            <React.Fragment key={db.dbName}>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() =>
                                        setOpenDb((prev) => ({ ...prev, [db.dbName]: !prev[db.dbName] }))
                                    }
                                >
                                    <ListItemText primary={db.dbName} />
                                    {openDb[db.dbName] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openDb[db.dbName]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {db.tables.map((table) => (
                                            <React.Fragment key={table.tableName}>
                                                <ListItemButton
                                                    sx={{ pl: 6 }}
                                                    onClick={() =>
                                                        setOpenTable((prev) => ({
                                                            ...prev,
                                                            [table.tableName]: !prev[table.tableName],
                                                        }))
                                                    }
                                                >
                                                    <ListItemText primary={table.tableName} />
                                                    {openTable[table.tableName] ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={openTable[table.tableName]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {table.columns.map((col) => (
                                                            <ListItemButton key={col} sx={{ pl: 8 }}>
                                                                <ListItemText primary={col} />
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

                <Divider />

                {/* Reports */}
                <ListItemButton>
                    <ListItemText primary="Reports" />
                </ListItemButton>

                <Divider />

                {/* Settings */}
                <ListItemButton>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {/* Temporary drawer للموبايل */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Permanent drawer للكمبيوتر */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
