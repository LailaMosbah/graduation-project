import React from 'react'
import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from '../components/Chat';
import QueryResult from '../components/QueryResult';

// Material UI
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

export default function ChatPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [queryResult, setQueryResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSend = async ({ question, database }) => {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Mock response - replace with actual API call
        setQueryResult({
            status: "FINISHED",
            query: `SELECT p_name, p_category, p_price 
                    FROM ${database}.products 
                    WHERE p_category = 'electronics' 
                    AND p_price > 100 
                    ORDER BY p_price DESC 
                    LIMIT 10;`,
            data: {
                column: "p_name",
                value: "pale purple papaya lace drab"
            },
            executionTime: 245
        });

        setIsLoading(false);
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
                        <Chat onSend={handleSend} />
                    </Box>

                    <Box sx={{
                        flex: { xs: 1, lg: 1 },
                        minWidth: { lg: 400 }
                    }}>
                        <QueryResult queryResult={queryResult} isLoading={isLoading} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}