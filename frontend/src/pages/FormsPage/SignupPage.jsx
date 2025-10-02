import React from 'react'
import SignupForm from '../../components/Forms/SignupForm'
import './form.css'

// MUI
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'


export default function SignupPage() {


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

                <SignupForm />
            </Container>

        </>
    )
}
