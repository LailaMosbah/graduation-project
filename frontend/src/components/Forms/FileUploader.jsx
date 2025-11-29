import React, { useState } from "react";
import {
    Button,
    LinearProgress,
    Alert,
    Box
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function FileUploader({ idTable }) {
    const { control, handleSubmit } = useForm();
    const [uploadState, setUploadState] = useState("idle");
    const [progress, setProgress] = useState(0);

    // will remove later
    const simulateUpload = (file) => {
        setUploadState("uploading");
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setUploadState("success");
                    return 100;
                }
                return p + 5;
            });
            console.log(file.name);
        }, 200);
    };

    const onSubmit = (data) => {
        const file = data.file?.[0];
        console.log("Uploading file for table ID:", idTable);

        if (!file) return;

        simulateUpload(file);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box width="100%" sx={{ display: 'flex', direction: "row", gap: 2, alignItems: 'center', mt: 2 }}>

                <Controller
                    name="file"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <Button
                            variant="contained"
                            component="label"
                            color={
                                uploadState === "success"
                                    ? "success"
                                    : uploadState === "error"
                                        ? "error"
                                        : "primary"
                            }
                            disabled={uploadState === "uploading"}
                        >
                            {uploadState === "idle" && "Upload Data"}
                            {uploadState === "uploading" && "Uploading..."}
                            {uploadState === "success" && "Uploaded ✓"}
                            {uploadState === "error" && "Failed ✗"}

                            <input
                                type="file"
                                hidden
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    handleSubmit(onSubmit)();
                                }}
                            />
                        </Button>
                    )}
                />

                {uploadState === "uploading" && (
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ borderRadius: 1, height: 8 }}
                    />
                )}

                {uploadState === "success" && (
                    <Alert severity="success">File uploaded successfully.</Alert>
                )}

                {uploadState === "error" && (
                    <Alert severity="error">Upload failed. Please try again.</Alert>
                )}
            </Box>
        </form>
    );
}
