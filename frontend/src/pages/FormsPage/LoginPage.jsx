import React from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import './form.css'

// MUI
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'


export default function LoginPage() {
    function onSubmit(data) {
        console.log("Form Data:", data)
    }

    function onError(errors) {
        console.log("Validation Errors:", errors)
    }

    return (
        <>
            <Container maxWidth="sm"
                sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: 'primary.main' }}
                display="flex"
                direction="column"
                justifycontent="center"
                alignitems="center"
                padding={3}
                spacing={3}
                boxshadow={3}
                borderradius={2}
                width="100%"
                margin="auto"
            >

                <LoginForm onSubmit={onSubmit} onError={onError} />
            </Container>


        </>
    )
}
