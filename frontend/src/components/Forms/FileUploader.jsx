import React, { useState } from "react";
import {
    Button,
    LinearProgress,
    Alert,
    Box
} from "@mui/material";

export default function FileUploader({ setValue, errors }) {
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Reset states before new upload
        setUploadState("idle");
        setProgress(0);

        setValue("dataFile", file);
        try {
            simulateUpload(file);
        }
        catch (err) {
            console.error("Upload error:", err);
            setUploadState("error");
        }

    }


    return (
        <Box width="100%" sx={{ display: 'flex', direction: "row", gap: 2, alignItems: 'center', mt: 2 }}>
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
                    onChange={handleFileUpload}
                    error={!!errors.dataFile}
                    helperText={errors.dataFile?.message}
                />
            </Button>

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
    );
}
