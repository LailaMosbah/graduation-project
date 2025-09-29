import React from 'react'
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
// Matrial UI
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";


export default function SaveItLater() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                {/* هنا هيبقى المحتوى الأساسي */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* عشان تسيب مساحة للـ Navbar فوق */}
                    <Toolbar />
                    <h1>Welcome to PixelsDB 👋</h1>
                </Box>
            </Box>
        </div>
    )
}
