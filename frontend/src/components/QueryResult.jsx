import React from "react";

// Material UI
import {
    Box, Typography, Paper, Chip, Alert, CircularProgress, IconButton, Tooltip, Card, CardContent
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DataObjectIcon from '@mui/icons-material/DataObject';



export default function QueryResult({ queryResult }) {
    console.log("QueryResult received:", queryResult);



    if (!queryResult) {
        return (
            <Card sx={{
                flex: 1,
                border: "2px dashed",
                borderColor: "grey.300",
                borderRadius: 3,
                background: "linear-gradient(135deg, #fafbfc 0%, #f8fbff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400
            }}>
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <DataObjectIcon
                        sx={{
                            fontSize: 64,
                            color: "grey.400",
                            mb: 2,
                            opacity: 0.7
                        }}
                    />
                    <Typography variant="h6" color="grey.600" gutterBottom>
                        SQL Results Will Appear Here
                    </Typography>
                    <Typography variant="body2" color="grey.500" sx={{ maxWidth: 300 }}>
                        Enter a question above and the AI will generate and execute the corresponding SQL query
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    // const isError = queryResult.status === "ERROR";

    if (queryResult?.status === "PENDING") {
        console.log("pendinnnnnnng")
        return (
            <Card sx={{ flex: 1, border: "1px solid #e0e0e0", borderRadius: 3 }}>
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <CircularProgress size={50} sx={{ color: "grey.500", mb: 2 }} />
                    <Typography variant="h6">Waiting for execution...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (queryResult?.status === "RUNNING") {
        return (
            <Card sx={{ flex: 1, border: "1px solid #e0e0e0", borderRadius: 3 }}>
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <CircularProgress size={50} color="primary" sx={{ mb: 2 }} />
                    <Typography variant="h6">Query is running...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (queryResult?.status === "FAILURE") {
        return (
            <Card sx={{
                flex: 1,
                border: "1px solid",
                borderColor: "error.light",
                borderRadius: 3,
                backgroundColor: "error.light"
            }}>
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <ErrorIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" color="error" gutterBottom>
                        Query Failed
                    </Typography>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            {queryResult.error || "An unexpected error occurred"}
                        </Typography>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    if (queryResult?.status === "FINISHED") {
        console.log("size of data ", Object.keys(queryResult.data).length);
        return (
            <Card sx={{
                flex: 1,
                border: "1px solid #e0e0e0",
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
                                background: "linear-gradient(135deg, #2e7d32 0%, #5b9e5f 100%)",
                                borderRadius: 2,
                                p: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <CheckCircleIcon sx={{ color: "white", fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    Query Result
                                </Typography>
                                <Chip
                                    label={queryResult.status}
                                    size="small"
                                    color={"success"}
                                    variant="filled"
                                    sx={{ fontWeight: "medium" }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Status Alert */}
                    <Alert
                        severity="success"
                        sx={{
                            mb: 3,
                            borderRadius: 2,
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body2" fontWeight="medium">
                            Query generated successfully! Found {Object.keys(queryResult.data).length >= 0 ? `${Object.keys(queryResult.data).length} results` : " 0 result"}
                        </Typography>
                    </Alert>

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
                                    color: 'inherit'
                                }}
                            >
                                {queryResult.query}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Results Data */}
                    {queryResult.data && (
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
                        <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 2, borderTop: "1px solid #f0f0f0" }}>
                            <Chip
                                label={`Pending Time : ${queryResult.pendingTime}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Executed in : ${queryResult.executionTime}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Cost : ${queryResult.cost}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            {/* <Typography variant="body2" color="text.secondary">
                                Pending Time :  {queryResult.pendingTime}ms
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Executed in : {queryResult.executionTime}ms
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cost : {queryResult.cost}$
                            </Typography> */}
                        </Box>
                    )}
                </CardContent>
            </Card>
        );
    }



}