import React from "react";
import { Box, Stack, TextField, Button, Select, MenuItem, Typography, Paper } from "@mui/material";


export default function QueryResult({ queryResult }) {
    if (!queryResult) return null;

    return (
        <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6">Query Result</Typography>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                Query Status: {queryResult.status}
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {queryResult.query}
                </Typography>
            </Box>
            {queryResult.data && (
                <Box sx={{ mt: 2, borderTop: "1px solid #ccc", pt: 1 }}>
                    <Typography variant="body2">
                        <strong>{queryResult.data.column}</strong>: {queryResult.data.value}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}