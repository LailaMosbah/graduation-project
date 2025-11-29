import React from 'react'
import { useForm } from 'react-hook-form'
import FileUploader from './FileUploader'

// import Components
import { Stack, TextField } from "@mui/material"


export default function AddDatabaseV2() {
    const form = useForm()
    const { register, control, handleSubmit, formState } = form
    const { isSubmitting, isSubmitted, isSubmitSuccessful, errors } = formState

    function sendDatabase(formData) {
        console.log("sending dataBase")
        console.log(formData)
    }
    function onError() {
        console.log("error while sending database")
    }
    return (
        <>
            <form onSubmit={handleSubmit(sendDatabase, onError)}>
                <Stack spacing={4} width={400}>
                    <TextField label="Database Name" type='text' {...register("databaseName", {
                        required: "Database Name is required"
                    })}
                        error={!!errors.databaseName}
                        helperText={errors.databaseName?.message}
                    />

                    <FileUploader />

                </Stack>
            </form>
        </>
    )
}
