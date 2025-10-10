import React from 'react'
import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from '../components/Chat';
import QueryResult from '../components/QueryResult';
// Matrial UI
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";



export default function ChatPage() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [queryResult, setQueryResult] = useState(null);

    const handleSend = async ({ question, database }) => {
        // بعدين هنا هيتربط مع الـ backend
        setQueryResult({
            status: "FINISHED",
            query: `SELECT ... FROM ${database} ...`,
            data: { column: "p_name", value: "pale purple papaya lace drab" },
        });
    };
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                {/* هنا هيبقى المحتوى الأساسي */}
                <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                    <Chat onSend={handleSend} />
                    <QueryResult queryResult={queryResult} />
                </Box>
            </Box>
        </div>
    )
}
