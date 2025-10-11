import React from "react";
import { useState } from "react";

// Material UI
import {
    Box, Typography, Paper, Chip, Alert, CircularProgress, IconButton, Tooltip, Card, CardContent
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DataObjectIcon from '@mui/icons-material/DataObject';



export default function QueryResult({ queryResult, isLoading }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (queryResult?.query) {
            await navigator.clipboard.writeText(queryResult.query);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <Card sx={{
                flex: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.05)"
            }}>
                <CardContent sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <CircularProgress
                        size={60}
                        thickness={4}
                        sx={{
                            color: "primary.main",
                            mb: 2
                        }}
                    />
                    <Typography variant="h6" color="primary" gutterBottom>
                        Generating SQL Query
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        AI is translating your question into optimized SQL...
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    if (!queryResult) {
        return (
            <Card sx={{
                flex: 1,
                border: "1px dashed #e0e0e0",
                borderRadius: 3,
                background: "linear-gradient(135deg, #fafbfc 0%, #f8fbff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <DataObjectIcon
                        sx={{
                            fontSize: 64,
                            color: "action.disabled",
                            mb: 2
                        }}
                    />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        SQL Results
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your translated SQL query and results will appear here
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const isError = queryResult.status === "ERROR";

    return (
        <Card sx={{
            flex: 1,
            border: isError ? "1px solid #ffcdd2" : "1px solid #e0e0e0",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.05)"
        }}>
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                    pb: 2,
                    borderBottom: "1px solid #f0f0f0"
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{
                            background: isError ?
                                "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)" :
                                "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
                            borderRadius: 2,
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {isError ? (
                                <ErrorIcon sx={{ color: "white", fontSize: 24 }} />
                            ) : (
                                <CheckCircleIcon sx={{ color: "white", fontSize: 24 }} />
                            )}
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                Query Result
                            </Typography>
                            <Chip
                                label={queryResult.status}
                                size="small"
                                color={isError ? "error" : "success"}
                                variant="filled"
                                sx={{ fontWeight: "medium" }}
                            />
                        </Box>
                    </Box>

                    {!isError && queryResult.query && (
                        <Tooltip title={copied ? "Copied!" : "Copy SQL"}>
                            <IconButton
                                onClick={handleCopy}
                                sx={{
                                    backgroundColor: 'action.hover',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'white'
                                    }
                                }}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                {/* Status Alert */}
                {isError ? (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                            borderRadius: 2,
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body2" fontWeight="medium">
                            {queryResult.error || "An error occurred while generating the query"}
                        </Typography>
                    </Alert>
                ) : (
                    <Alert
                        severity="success"
                        sx={{
                            mb: 3,
                            borderRadius: 2,
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body2" fontWeight="medium">
                            Query generated successfully! Found {queryResult.data ? "1 result" : "0 results"}
                        </Typography>
                    </Alert>
                )}

                {/* SQL Query */}
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
                                color: isError ? '#dc3545' : 'inherit'
                            }}
                        >
                            {queryResult.query}
                        </Typography>
                    </Paper>
                </Box>

                {/* Results Data */}
                {queryResult.data && !isError && (
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="medium" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            📊 Query Results
                        </Typography>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                backgroundColor: '#f0f4ff',
                                borderColor: '#dbe4ff',
                                borderRadius: 2
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Chip
                                    label={queryResult.data.column}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                    :
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'monospace',
                                        backgroundColor: 'white',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        border: '1px solid #e0e0e0'
                                    }}
                                >
                                    {queryResult.data.value}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                )}

                {/* Execution Info */}
                {queryResult.executionTime && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #f0f0f0" }}>
                        <Typography variant="body2" color="text.secondary">
                            ⚡ Executed in {queryResult.executionTime}ms
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}