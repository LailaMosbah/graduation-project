import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from "../../contexts/useAuth"

// MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function SignupForm() {
  const form = useForm()
  const { register, handleSubmit, formState: { errors }, getValues } = form
  const { signup } = useAuth()


  // On form submit
  function onSubmit(data) {
    const { confPassword, ...cleanData } = data
    signup(cleanData)
    console.log("Form Data:", data)
    console.log("confPassword :", confPassword)
  }

  // On form error
  function onError(errors) {
    console.log("Validation Errors:", errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} style={{ width: "100%" }} >
      {/* Username */}
      <TextField
        label="Username"
        variant="outlined"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message}
        fullWidth
        margin="normal"
      />

      {/* Email */}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format"
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />

      {/* Password */}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        margin="normal"
      />

      {/* Confirm Password */}
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        {...register("confPassword", {
          required: "Confirming Password is required",
          validate: (value) => {
            const { password } = getValues()
            return value === password || "Passwords do not match"
          }
        })}
        error={!!errors.confPassword}
        helperText={errors.confPassword?.message}
        fullWidth
        margin="normal"
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.5, fontSize: '1rem', backgroundColor: '#094BB0', '&:hover': { backgroundColor: '#083a8a' } }}>
        Sign Up
      </Button>
    </form>
  )
}
