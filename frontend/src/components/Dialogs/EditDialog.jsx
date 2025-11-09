import React from "react";
import { useForm } from "react-hook-form";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField
} from "@mui/material";

export default function EditDialog({ open, onClose, sqlResult, onSave }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { sqlEdit: sqlResult || "" },
    });

    React.useEffect(() => {
        reset({ sqlEdit: sqlResult });
    }, [sqlResult, reset]);

    const handleSave = (data) => onSave(data.sqlEdit);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", color: "primary.main", pb: 1 }}>
                Edit SQL Query
            </DialogTitle>
            <DialogContent>
                <TextField {...register("sqlEdit")} fullWidth multiline minRows={5}
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
                    }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit(handleSave)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
