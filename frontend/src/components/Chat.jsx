import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDatabase } from "../contexts/useDatabase";
import { useState, useEffect } from "react";

// Services
import { translateToSQL } from "../services/translateToSql";

// Components
import SqlResult from "./SqlResult";

// MUI Components
import {
    Box, Stack, TextField, Button, Select, MenuItem, Paper, Typography, FormControl, FormHelperText, InputLabel, Chip, Card, CardContent,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import { Co2Sharp } from "@mui/icons-material";


export default function Chat({ onExecute }) {
    const { databases } = useDatabase();
    const [sqlResult, setSqlResult] = useState("");
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openSendDialog, setOpenSendDialog] = React.useState(false);


    // Translate Form Setup
    const {
        register: registerTranslate,
        handleSubmit: handleTranslateSubmit,
        control, // Added for Controller
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            question: "",
            database: "", // Will be set to first database in useEffect
        },
    });

    const question = watch("question");
    const database = watch("database");

    // Set default database when available
    useEffect(() => {
        if (databases.length > 0 && !database) {
            setValue("database", databases[0].dbName, { shouldValidate: true });
        }
    }, [databases, setValue, database]);

    // Edit Form Setup
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: errorsEdit },
    } = useForm({
        defaultValues: {
            sqlEdit: "",
        },
    });

    // Execute Form Setup
    const {
        register: registerExecute, handleSubmit: handleSubmitExecute, control: controlExecute, setValue: setValueExecute, } = useForm({
            defaultValues: {
                sqlExecute: sqlResult,
                database: database,
                service: "",
                limit: 0
            },
        });
    useEffect(() => {
        setValueExecute("sqlExecute", sqlResult);
        setValueExecute("database", database);
    }, [sqlResult, database, setValueExecute]);

    // Handlers
    const onTranslate = async (data) => {
        try {
            const sql = await translateToSQL(data.question, data.database);
            setSqlResult(sql);
        } catch (err) {
            console.error("Translation error:", err);
        }
    };

    const onEditSql = (data) => {
        setSqlResult(data.sqlEdit);
        setOpenEditDialog(false);
        console.log("Edited SQL:", data.sqlEdit);
    };

    const handleClickOpenEdit = () => {
        resetEdit({ sqlEdit: sqlResult });
        setOpenEditDialog(true);
    };

    const onSend = async (data) => {
        const payload = {
            sqlExecute: sqlResult, // Use sqlResult directly
            database: data.database || database, // Fallback to translate form's database
            service: data.service,
            limit: Number(data.limit), // Ensure limit is a number
        };
        console.log("Sending SQL to execute:", payload);
        if (typeof onExecute === "function") {
            setOpenSendDialog(false);
            await onExecute(payload);
        }

        // Add your logic to send the payload to the backend or API
    }

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

                    {/* Form Translate */}
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <form
                            onSubmit={handleTranslateSubmit(onTranslate)}
                            style={{ flex: 1, display: "flex", flexDirection: "column" }}
                        >
                            <Stack spacing={3} sx={{ flex: 1, mt: 1 }}>
                                {/* Question Field */}
                                <TextField
                                    {...registerTranslate("question", { required: "Question is required" })}
                                    error={!!errors.question}
                                    helperText={errors.question?.message}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    placeholder="Type your question in natural language...\nExample: 'Show me all customers from New York who made purchases in the last month'"
                                    sx={{
                                        flex: 1,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            fontSize: "0.95rem",
                                            "& textarea": {
                                                resize: "vertical",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "primary.main",
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "primary.main",
                                                borderWidth: "2px",
                                            },
                                        },
                                    }}
                                />
                                {/* Action Area */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        pt: 2,
                                        borderTop: "1px solid #f0f0f0",
                                    }}
                                >
                                    {/* Database Select */}
                                    <FormControl fullWidth error={!!errors.database}>
                                        <InputLabel id="database-select-label">Select Database</InputLabel>
                                        {databases.length === 0 ? (
                                            <Typography color="text.secondary">No databases available</Typography>
                                        ) : (
                                            <Controller
                                                name="database"
                                                control={control}
                                                rules={{ required: "Database selection is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        labelId="database-select-label"
                                                        label="Select Database"
                                                        input={<OutlinedInput label="Select Database" />}
                                                        aria-label="Select a database"
                                                        onChange={(e) => field.onChange(e.target.value)} // Ensure value updates
                                                        value={field.value || ""} // Prevent undefined
                                                        sx={{
                                                            borderRadius: 2,
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#e0e0e0",
                                                            },
                                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "primary.main",
                                                            },
                                                        }}
                                                    >
                                                        {databases.map((db) => (
                                                            <MenuItem key={db.dbId} value={db.dbName}>
                                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                    <Box
                                                                        sx={{
                                                                            width: 8,
                                                                            height: 8,
                                                                            borderRadius: "50%",
                                                                            backgroundColor: "primary.main",
                                                                        }}
                                                                    />
                                                                    {db.dbName}
                                                                    <Chip
                                                                        label={`${db.tables.length} tables`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        sx={{ ml: "auto", height: 20, fontSize: "0.6rem" }}
                                                                    />
                                                                </Box>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                        )}
                                        {errors.database && (
                                            <FormHelperText sx={{ fontSize: "0.8rem" }}>
                                                {errors.database.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={!question.trim() || !database || isSubmitting || databases.length === 0}
                                        endIcon={<SendIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            px: 2,
                                            py: 1,
                                            background: "linear-gradient(135deg, #094BB0 0%, #094BB0 100%)",
                                            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                                            color: "white",
                                            lineHeight: 1.3,
                                            "&:hover": {
                                                boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                                                transform: "translateY(-1px)",
                                            },
                                            "&:disabled": {
                                                background: "action.disabled",
                                                boxShadow: "none",
                                                color: "text.disabled",
                                            },
                                        }}
                                    >
                                        {isSubmitting ? "Translating..." : "Translate to SQL"}
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                        {/* SQL Result Preview */}
                        <Box sx={{ mt: 4, borderTop: "1px solid #f0f0f0", pt: 3 }}>
                            {sqlResult && (
                                <>
                                    <SqlResult sqlResult={sqlResult} />
                                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                        <Tooltip title="Edit the SQL query before executing" placement="bottom-start">
                                            <Button variant="outlined" onClick={handleClickOpenEdit}>
                                                Edit
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Execute the SQL query on the selected database" placement="bottom-start">
                                            <Button variant="outlined" onClick={() => { setOpenSendDialog(true) }}>
                                                Send
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {/* Edit Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="md" // Set a wider max width
                fullWidth // Ensure it takes the full width up to maxWidth
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 2,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)", // Match Card gradient
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", color: "primary.main", pb: 1 }}>
                    Edit SQL Query
                </DialogTitle>
                <form onSubmit={handleSubmitEdit(onEditSql)}>
                    <DialogContent sx={{ pt: 2, pb: 3 }}>
                        <TextField
                            {...registerEdit("sqlEdit", {
                                required: "SQL query is required",
                                minLength: {
                                    value: 3,
                                    message: "SQL query must be at least 3 characters",
                                },
                            })}
                            error={!!errorsEdit.sqlEdit}
                            helperText={errorsEdit.sqlEdit?.message}
                            multiline
                            minRows={6} // Increased rows for better visibility
                            autoFocus
                            label="SQL Query"
                            fullWidth
                            variant="outlined" // Changed to outlined for modern look
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    fontFamily: "'Roboto Mono', monospace", // Monospace font for SQL
                                    fontSize: "0.95rem",
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                        borderWidth: "2px",
                                    },
                                },
                            }}
                            placeholder="Enter your SQL query here..."
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                        <Button
                            onClick={() => setOpenEditDialog(false)}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                color: "text.secondary",
                                borderColor: "grey.300",
                                "&:hover": {
                                    borderColor: "primary.main",
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                background: "linear-gradient(135deg, #094BB0 0%, #094BB0 100%)", // Match main button
                                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                                "&:hover": {
                                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                                    transform: "translateY(-1px)",
                                },
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Send Dialog */}
            <Dialog
                open={openSendDialog}
                onClose={() => setOpenSendDialog(false)}
                aria-labelledby="send-dialog-title"
                aria-describedby="send-dialog-description"
            >
                <DialogTitle id="send-dialog-title">
                    Execute the SQL Query on the Selected Database
                </DialogTitle>
                <DialogContent>
                    {/* Sql to be executed: */}
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
                    {/* Options to choose */}
                    <Paper>
                        <form onSubmit={handleSubmitExecute(onSend)} id="execute-form" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                            <FormControl fullWidth>
                                <InputLabel id="service-label">Service</InputLabel>
                                <Controller
                                    name="service"
                                    control={controlExecute}
                                    rules={{ required: "Service is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="service-select-label"
                                            label="Service"
                                            input={<OutlinedInput label="Service" />}
                                            aria-label="Select a service"
                                            onChange={(e) => field.onChange(e.target.value)} // Ensure value updates
                                            value={field.value || ""} // Prevent undefined
                                            sx={{
                                                borderRadius: 2,
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#e0e0e0",
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "primary.main",
                                                },
                                            }}
                                        >
                                            <MenuItem value={"immediate"}>Immediate</MenuItem>
                                            <MenuItem value={"relaxed"}>Relaxed</MenuItem>
                                            <MenuItem value={"best-of-effort."}>Best-of-effort</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    {...registerExecute("limit", {
                                        min: { value: 0, message: "Limit must be non-negative" },
                                    })}
                                    type="number"
                                    label="Limit"
                                    slotProps={{ inputProps: { min: 0 } }}
                                    sx={{ mt: 2 }}
                                />
                            </FormControl>
                            <input type="hidden" {...registerExecute("sqlExecute")} />
                            <input type="hidden" {...registerExecute("database")} />
                        </form>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSendDialog(false)}>Cancel</Button>
                    <Button type="submit" form="execute-form" autoFocus>
                        Execute
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}