import React, { useState, useEffect } from "react";
import { useDatabase } from "../contexts/useDatabase";
import { translateToSQL } from "../services/translateToSql";

// Components
import SqlResult from "./SqlResult";
import TranslateForm from "./Forms/TranslateForm";
import EditDialog from "./Dialogs/EditDialog";
import SendDialog from "./Dialogs/SendDialog";

// MUI
import { Box, Typography, Card, CardContent, Button, Tooltip } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function Chat({ onExecute }) {
    const { databases } = useDatabase();
    const [sqlResult, setSqlResult] = useState("");
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openSendDialog, setOpenSendDialog] = useState(false);
    const [database, setDatabase] = useState("");

    useEffect(() => {
        if (databases.length > 0 && !database) setDatabase(databases[0].dbName);
    }, [databases, database]);

    const handleTranslate = async (data) => {
        try {
            const sql = await translateToSQL(data.question, data.database);
            setSqlResult(sql);
            setDatabase(data.database);
        } catch (err) {
            console.error("Translation error:", err);
        }
    };

    const handleEditSave = (editedSQL) => {
        setSqlResult(editedSQL);
        setOpenEditDialog(false);
    };

    const handleSend = async (payload) => {
        setOpenSendDialog(false);
        if (typeof onExecute === "function") await onExecute(payload);
    };

    return (
        <>
            <Card
                sx={{
                    flex: 1,
                    background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
                    border: "1px solid #e0e0e0",
                    borderRadius: 3,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                }}
            >
                <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 3,
                            pb: 2,
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        <Box
                            sx={{
                                background: "linear-gradient(135deg, #094BB0 0%, #569CF9 100%)",
                                borderRadius: 2,
                                p: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AutoFixHighIcon sx={{ color: "white", fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" color="primary">
                                AI SQL Translator
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Convert natural language to SQL queries
                            </Typography>
                        </Box>
                    </Box>

                    {/* Translate Form */}
                    <TranslateForm
                        onTranslate={handleTranslate}
                        databases={databases}
                        defaultDatabase={database}
                    />

                    {/* SQL Result */}
                    {sqlResult && (
                        <Box sx={{ mt: 4, borderTop: "1px solid #f0f0f0", pt: 3 }}>
                            <SqlResult sqlResult={sqlResult} />
                            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Tooltip title="Edit the SQL query before executing">
                                    <Button variant="outlined" onClick={() => setOpenEditDialog(true)}>
                                        Edit
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Execute the SQL query on the selected database">
                                    <Button variant="outlined" onClick={() => setOpenSendDialog(true)}>
                                        Send
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/*
            //region Dialogs
            */}
            <EditDialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                sqlResult={sqlResult}
                onSave={handleEditSave}
            />

            <SendDialog
                open={openSendDialog}
                onClose={() => setOpenSendDialog(false)}
                sqlResult={sqlResult}
                database={database}
                onSend={handleSend}
            />
        </>
    );
}
