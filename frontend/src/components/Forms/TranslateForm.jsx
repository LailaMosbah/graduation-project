import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Box, Stack, TextField, Button, Select, MenuItem, FormControl,
    FormHelperText, InputLabel, Chip
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";

export default function TranslateForm({ onTranslate, databases, defaultDatabase }) {

    const { register, handleSubmit, control, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { question: "", database: defaultDatabase || "" },
    });

    React.useEffect(() => {
        if (databases.length > 0 && !watch("database")) {
            setValue("database", databases[0].dbName);
        }
    }, [databases, setValue, watch]);

    const question = watch("question");
    const database = watch("database");

    return (
        <form onSubmit={handleSubmit(onTranslate)} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Stack spacing={3} sx={{ flex: 1, mt: 1 }}>
                <TextField
                    {...register("question", { required: "Question is required" })}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="Type your question in natural language..."
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 2, borderTop: "1px solid #f0f0f0" }}>
                    <FormControl fullWidth error={!!errors.database}>
                        <InputLabel id="database-select-label">Select Database</InputLabel>
                        <Controller
                            name="database"
                            control={control}
                            rules={{ required: "Database selection is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="database-select-label"
                                    input={<OutlinedInput label="Select Database" />}
                                    value={field.value || ""}
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
                                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "primary.main" }} />
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
                        {errors.database && <FormHelperText>{errors.database.message}</FormHelperText>}
                    </FormControl>

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
    );
}
