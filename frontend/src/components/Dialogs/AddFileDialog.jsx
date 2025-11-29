import * as React from 'react';
import { useForm } from "react-hook-form";
import FileUploader from '../Forms/FileUploader';
import { useDatabase } from '../../contexts/useDatabase';

// MUI components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function AddFileDialog({ open, onClose }) {

    const { addDatabase } = useDatabase();

    const form = useForm();
    const { register, handleSubmit, reset, formState: { errors }, setValue } = form

    const sendFile = (event) => {
        console.log("File Data:", event)
        addDatabase({
            id: Date.now(),
            dbName: event.nameFile,
            // other properties can be added here
        });
        reset();
        onClose();
    };
    const onError = (errors) => {
        console.log("Validation Errors:", errors)
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 1.5,
                    }
                }}
            >
                <form onSubmit={handleSubmit(sendFile, onError)}>

                    <DialogTitle
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            pb: 0.5
                        }}
                    >
                        Add File
                    </DialogTitle>

                    <DialogContent
                        sx={{
                            mt: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <TextField
                            autoFocus
                            label="File Name"
                            variant="standard"
                            fullWidth
                            {...register("nameFile", { required: "File Name is Required" })}
                            error={!!errors.nameFile}
                            helperText={errors.nameFile?.message}
                        />

                        <FileUploader
                            register={register}
                            setValue={setValue}
                            errors={errors}
                        />
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={onClose}
                            color="inherit"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 0.8,
                                textTransform: "none",
                                fontWeight: "bold"
                            }}
                        >
                            Add
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>

        </>
    );
}