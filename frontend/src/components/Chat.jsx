import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDatabase } from "../contexts/useDatabase";

// MUI Components
import {
    Box, Stack, TextField, Button, Select, MenuItem, Typography, Paper, FormControl, FormHelperText,
    InputLabel, Chip, Card, CardContent
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default function Chat({ onSend }) {
    const { databases } = useDatabase();

    const {
        handleSubmit, control, reset, watch, formState: { errors, isSubmitting }, } = useForm({
            defaultValues: {
                question: "",
                database: "",
            },
        });

    const question = watch("question");
    const database = watch("database");

    const onSubmit = async (data) => {
        await onSend(data);
        reset({ question: "", database: data.database });
    };

    // const quickQuestions = [
    //     "Show all users",
    //     "Find orders from last week",
    //     "Count total products",
    //     "Get customer statistics"
    // ];

    return (
        <Card sx={{
            flex: 1,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
            border: "1px solid #e0e0e0",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.05)"
        }}>
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    pb: 2,
                    borderBottom: "1px solid #f0f0f0"
                }}>
                    <Box sx={{
                        background: "linear-gradient(135deg, #094BB0 0%, #569CF9 100%)",
                        borderRadius: 2,
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
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

                {/* Quick Questions */}
                {/* <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" fontWeight="medium" color="text.secondary" sx={{ mb: 1 }}>
                        Try asking:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {quickQuestions.map((q, index) => (
                            <Chip
                                key={index}
                                label={q}
                                size="small"
                                clickable
                                onClick={() => reset({ question: q, database })}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    backgroundColor: 'action.hover',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'primary.contrastText'
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                </Box> */}

                {/* Form */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <Stack spacing={3} sx={{ flex: 1, mt: 1 }}>
                            {/* Database Select */}
                            <FormControl fullWidth error={!!errors.database}>
                                <InputLabel id="database-select-label">
                                    Select Database
                                </InputLabel>
                                <Controller
                                    name="database"
                                    control={control}
                                    rules={{
                                        required: "Please select a database",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="database-select-label"
                                            label="Select Database"
                                            input={<OutlinedInput label="Select Database" />}
                                            sx={{
                                                borderRadius: 2,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#e0e0e0',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'primary.main',
                                                }
                                            }}
                                        >
                                            {databases.map((db) => (
                                                <MenuItem key={db.dbId} value={db.dbName}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Box sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            backgroundColor: 'primary.main'
                                                        }} />
                                                        {db.dbName}
                                                        <Chip
                                                            label={`${db.tables.length} tables`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ ml: 'auto', height: 20, fontSize: '0.6rem' }}
                                                        />
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.database && (
                                    <FormHelperText sx={{ fontSize: '0.8rem' }}>
                                        {errors.database.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {/* Question Field */}
                            <Controller
                                name="question"
                                control={control}
                                rules={{
                                    required: "Question is required",
                                    minLength: {
                                        value: 3,
                                        message: "Question must be at least 3 characters"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Type your question in natural language...
Example: 'Show me all customers from New York who made purchases in the last month'"
                                        error={!!errors.question}
                                        helperText={errors.question?.message}
                                        sx={{
                                            flex: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                fontSize: '0.95rem',
                                                '& textarea': {
                                                    resize: 'vertical',
                                                    minHeight: '80px'
                                                }
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'primary.main',
                                            }
                                        }}
                                    />
                                )}
                            />

                            {/* Action Area */}
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                pt: 2,
                                borderTop: "1px solid #f0f0f0"
                            }}>
                                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                    Press Enter to send • Shift+Enter for new line
                                </Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!question.trim() || !database || isSubmitting}
                                    endIcon={<SendIcon />}
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        py: 1,
                                        background: "linear-gradient(135deg, #094BB0 0%, #094BB0 100%)",
                                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                                        color: "white",
                                        '&:hover': {
                                            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                                            transform: "translateY(-1px)"
                                        },
                                        '&:disabled': {
                                            background: 'action.disabled',
                                            boxShadow: 'none',
                                            color: 'text.disabled'
                                        }
                                    }}
                                >
                                    {isSubmitting ? "Translating..." : "Translate to SQL"}
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );
}