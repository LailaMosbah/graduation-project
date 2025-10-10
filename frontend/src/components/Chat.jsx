import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDatabase } from "../contexts/useDatabase";

// MUI Components
import {
    Box, Stack, TextField, Button, Select, MenuItem, Typography, Paper, FormControl, FormHelperText,
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';





export default function Chat({ onSend }) {
    const { databases } = useDatabase();

    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            question: "",
            database: "",
        },
    });

    const question = watch("question");
    const database = watch("database");

    const onSubmit = (data) => {
        onSend(data);
        reset({ question: "", database: data.database });
    };

    return (
        <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6">Translator</Typography>
            <Box sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>

                            {/* Question Field */}
                            <Controller
                                name="question"
                                control={control}
                                rules={{
                                    required: "Question is required",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        placeholder="Type your question..."
                                        error={!!errors.question}
                                        helperText={errors.question?.message}
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && !e.shiftKey && handleSubmit(onSubmit)()
                                        }
                                    />
                                )}
                            />

                            {/* Database Select */}
                            <FormControl
                                fullWidth
                                error={!!errors.database}
                                sx={{ minWidth: 150 }}
                            >
                                <InputLabel id="database-select-label" >
                                    Database
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
                                            label="Database"
                                            input={<OutlinedInput label="Name" />}

                                        >
                                            {databases.map((db) => (
                                                <MenuItem key={db.dbId} value={db.dbName}>
                                                    {db.dbName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.database && (
                                    <FormHelperText>{errors.database.message}</FormHelperText>
                                )}
                            </FormControl>

                            {/* Send Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!question.trim() || !database}
                            >
                                Send
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </Paper>
    );
}
