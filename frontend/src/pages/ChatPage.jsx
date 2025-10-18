import React from 'react'
import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from '../components/Chat';
import QueryResult from '../components/QueryResult';
import { executeQuery } from '../services/executeQuery';

// Material UI
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

export default function ChatPage() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [queryResult, setQueryResult] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleExecute = async (data) => {
        // Simulate API call delay
        // await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Executing query with data:", data);
        const result = await executeQuery(data);
        setQueryResult(result);
    };

    return (
        <Box sx={{
            // display: "flex",
            // minHeight: "100vh",
            background: "linear-gradient(135deg, #f5f7fa  0%, #e4edf5  100%)"
        }}>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

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

                <Box sx={{
                    display: "flex",
                    gap: 3,
                    // height: "calc(100vh - 140px)",
                    flexDirection: { xs: "column", lg: "row" }
                }}>
                    <Box sx={{
                        flex: { xs: 1, lg: 1 },
                        minWidth: { lg: 400 }
                    }}>
                        <Chat onExecute={handleExecute} />
                    </Box>

                    <Box sx={{
                        flex: { xs: 1, lg: 1 },
                        minWidth: { lg: 400 }
                    }}>
                        <QueryResult queryResult={queryResult} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}