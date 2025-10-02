import React from 'react'
import { useForm } from 'react-hook-form'

// MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function LoginForm() {
    const form = useForm()
    const { register, handleSubmit, formState: { errors } } = form


    // On form submit
    function onSubmit(data) {
        console.log("Form Data:", data)
    }

    // On form error
    function onError(errors) {
        console.log("Validation Errors:", errors)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} style={{ width: "100%" }} >
            <TextField
                label="Email"
                variant="outlined"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                margin="normal"
            />

            <Button type="submit" fullWidth variant="contained">
                Login
            </Button>
        </form>
    )
}
