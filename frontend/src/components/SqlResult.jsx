import React from 'react'


// Material UI
import {
    Box, Typography, Paper, Chip, Alert, CircularProgress, IconButton, Tooltip, Card, CardContent
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function SqlResult({ sqlResult }) {
    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="medium" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    📋 Generated SQL
                </Typography>
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        backgroundColor: '#f8f9fa',
                        borderColor: '#e9ecef',
                        borderRadius: 2,
                        position: 'relative'
                    }}
                >
                    <Typography
                        variant="body2"
                        component="pre"
                        sx={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            fontSize: '0.85rem',
                            lineHeight: 1.5,
                            margin: 0,
                            // color: isError ? '#dc3545' : 'inherit'
                        }}
                    >
                        {sqlResult}
                    </Typography>
                </Paper>
            </Box>
        </>
    )
}
