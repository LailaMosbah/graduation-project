import React, { useState } from "react";
import {
    Button,
    LinearProgress,
    Alert,
    Box
} from "@mui/material";

export default function FileUploader({ idTable }) {
    const [uploadState, setUploadState] = useState("idle");
    // idle | uploading | success | error
    const [progress, setProgress] = useState(0);

    const simulateUpload = (file) => {
        setUploadState("uploading");
        setProgress(0);

        // ده مثال لمحاكاة upload كبير 
        // في الحقيقة هتبدليه بـ API حقيقية باستخدام axios أو fetch مع onUploadProgress
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

    const handleUpload = (e) => {
        const file = e.target.files[0];
        console.log("Uploading file for table ID:", idTable);
        if (!file) return;

        // هنا ممكن تتأكدي من الحجم أو النوع لو عايزة
        simulateUpload(file);
    };

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

                <input type="file" hidden onChange={handleUpload} />
            </Button>

            {uploadState === "uploading" && (
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ borderRadius: 1, height: 8 }}
                />
            )}

            {uploadState === "success" && (
                <Alert severity="success" >
                    File uploaded successfully.
                </Alert>
            )}

            {uploadState === "error" && (
                <Alert severity="error">
                    Upload failed. Please try again.
                </Alert>
            )}
        </Box>
    );
}
