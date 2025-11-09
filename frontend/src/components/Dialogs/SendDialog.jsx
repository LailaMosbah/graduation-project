import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, OutlinedInput,
} from "@mui/material";

export default function SendDialog({ open, onClose, sqlResult, database, onSend }) {
    const { control, handleSubmit, register } = useForm({
        defaultValues: { sqlExecute: sqlResult, database, service: "", limit: 0 },
    });

    const handleSend = (data) => {
        onSend({
            sqlExecute: sqlResult,
            database: data.database,
            service: data.service,
            limit: Number(data.limit),
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", color: "primary.main", pb: 1 }}>
                Execute SQL
            </DialogTitle>

            <DialogContent>
                <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="service-label">Service</InputLabel>
                    <Controller
                        name="service"
                        control={control}
                        rules={{ required: "Service is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="service-label"
                                input={<OutlinedInput label="Service" />}
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
                                <MenuItem value="immediate">Immediate</MenuItem>
                                <MenuItem value="relaxed">Relaxed</MenuItem>
                                <MenuItem value="best-of-effort">Best-of-effort</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <TextField
                    {...register("limit")}
                    label="Limit"
                    type="number"
                    fullWidth
                    sx={{
                        mt: 3,
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "primary.main",
                        },
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit(handleSend)}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}
