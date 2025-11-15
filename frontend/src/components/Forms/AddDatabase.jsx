import React, { useState } from "react";
import {
    Box, Stepper, Step, StepLabel, Button, Typography, TextField, Paper, Stack, IconButton, Divider,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import { Delete as DeleteIcon, MailRounded } from "@mui/icons-material";
import { useDatabase } from "../../contexts/useDatabase";
import FileUploader from "./FileUploader";
import { useNavigate } from "react-router-dom";

const steps = ["Database Name", "Tables", "Columns & Data", "Review & Create"];

export default function AddDatabase() {
    const { addDatabase } = useDatabase();

    // Stepper State
    const [activeStep, setActiveStep] = useState(0);

    const [dbName, setDbName] = useState("");

    const [tables, setTables] = useState([{ name: "", columns: [""] }]);

    const handleNext = () => {
        if (activeStep === 0 && !dbName.trim()) return alert("Please enter a database name");
        if (activeStep === 1) {
            if (tables.some(t => !t.name.trim())) return alert("Every table must have a name");
        }
        if (activeStep === 2) {
            for (let table of tables) {
                if (table.columns.some(c => !c.trim())) {
                    return alert(`All columns of table "${table.name}" must have names`);
                }
            }
        }
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => setActiveStep(prev => prev - 1);


    //======== Table & Column Management Functions ========
    const addTable = () => setTables([...tables, { name: "", columns: [""] }]);

    const removeTable = (i) => setTables(tables.filter((_, index) => index !== i));

    const updateTableName = (i, value) => {
        const copy = [...tables];
        copy[i].name = value;
        setTables(copy);
    };

    const addColumn = (tableIndex) => {
        const copy = [...tables];
        copy[tableIndex].columns.push("");
        setTables(copy);
    };

    const updateColumn = (tableIndex, colIndex, value) => {
        const copy = [...tables];
        copy[tableIndex].columns[colIndex] = value;
        setTables(copy);
    };

    const removeColumn = (tableIndex, colIndex) => {
        const copy = [...tables];
        copy[tableIndex].columns.splice(colIndex, 1);
        setTables(copy);
    };

    // ======== Create Database ========
    const navigate = useNavigate();
    const handleCreate = () => {
        const newDB = {
            dbName,
            tables: tables.map(t => ({
                tableName: t.name,
                columns: t.columns,
            })),
        };
        console.log("Creating Database:", newDB);

        addDatabase(newDB);
        alert("Database created!");
        setDbName("");
        setTables([{ name: "", columns: [""] }]);
        setActiveStep(0);
        navigate('/chat')

        // Reset Form


    };

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel><Typography fontWeight="bold">{label}</Typography></StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Paper sx={{ p: 4, mt: 4 }}>
                {/* ================= STEP 1 ================= */}
                {activeStep === 0 && (
                    <Box>
                        <Typography variant="h5" sx={{ color: "primary.main" }}>Enter Database Name</Typography>
                        <TextField
                            fullWidth
                            label="Database Name"
                            sx={{
                                mt: 2, color: 'primary.main',
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
                            value={dbName}
                            onChange={e => setDbName(e.target.value)}
                        />
                    </Box>
                )}

                {/* ================= STEP 2 ================= */}
                {activeStep === 1 && (
                    <Box>
                        <Typography variant="h5" sx={{ color: "primary.main" }}>Tables</Typography>

                        {tables.map((table, i) => (
                            <Paper key={i} sx={{ p: 2, mt: 2, boxShadow: "none" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <TextField
                                        label={`Table #${i + 1}`}
                                        value={table.name}
                                        onChange={(e) => updateTableName(i, e.target.value)}
                                        fullWidth
                                        sx={{
                                            borderRadius: 2,
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#e0e0e0",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "primary.main",
                                            },
                                        }}
                                    />
                                    <IconButton onClick={() => removeTable(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        ))}
                        <Button sx={{ mt: 2 }} onClick={addTable}>
                            Add Table
                        </Button>
                    </Box>
                )}

                {/* ================= STEP 3 ================= */}
                {activeStep === 2 && (
                    // console.log(tables),
                    <Box>
                        <Typography variant="h5" sx={{ color: 'primary.main' }}>Columns & Data</Typography>

                        {tables.map((table, tIndex) => (
                            <Paper key={tIndex} sx={{ p: 2, mt: 3 }}>
                                <Typography fontWeight="bold" mb={2}>
                                    {table.name}
                                </Typography>

                                {table.columns.map((col, cIndex) => (
                                    <Stack key={cIndex} direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <TextField
                                            label={`Column #${cIndex + 1}`}
                                            value={col}
                                            onChange={(e) => updateColumn(tIndex, cIndex, e.target.value)}
                                            fullWidth
                                            sx={{
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
                                        <IconButton onClick={() => removeColumn(tIndex, cIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                ))}

                                <Stack direction="row" spacing={2} mt={1}>
                                    <Button variant="outlined" sx={{ width: 'fit-content', whiteSpace: "nowrap" }} onClick={() => addColumn(tIndex)}>
                                        Add Column
                                    </Button>

                                    <FileUploader idTable={tIndex} />
                                </Stack>
                            </Paper>
                        ))}
                    </Box>
                )}

                {/* ================= STEP 4 ================= */}
                {activeStep === 3 && (
                    <Box>
                        <Typography variant="h5" sx={{ color: 'primary.main' }}>Review</Typography>

                        <Paper sx={{ p: 3, mt: 2 }}>
                            <Typography><b>Database Name:</b> {dbName}</Typography>

                            <Divider sx={{ my: 2 }} />

                            {tables.map((t, i) => (
                                <Box key={i} sx={{ mb: 2 }}>
                                    <Typography><b>Table:</b> {t.name}</Typography>
                                    <Typography sx={{ pl: 2 }}>Columns: {t.columns.join(", ")}</Typography>
                                </Box>
                            ))}
                        </Paper>

                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 3 }}
                            onClick={handleCreate}
                        >
                            Create Database
                        </Button>
                    </Box>
                )}

                {/* ===== BUTTONS OF STEPPER ===== */}
                <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                    >
                        Next
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
