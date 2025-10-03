import React from 'react'
import SignupForm from '../../components/Forms/SignupForm'
import './form.css'

// MUI
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function SignupPage() {

    return (
        <Box className="signup-page-background">
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                sx={{
                    minHeight: '100vh',
                    py: 4,
                    px: 2
                }}
            >
                {/* Form Container - Always visible */}
                <Container
                    maxWidth="sm"
                    className="form-container"
                >
                    <Box
                        className="glass-effect pulse-glow"
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                                transform: { xs: 'none', md: 'translateY(-4px)' }
                            }
                        }}
                    >
                        {/* Header */}
                        <Box textAlign="center" mb={3}>
                            <Typography
                                variant="h4"
                                component="h1"
                                fontWeight="bold"
                                sx={{
                                    background: 'linear-gradient(135deg, #094BB0 0%, #569CF9 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                    mb: 1
                                }}
                            >
                                Create Account
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ opacity: 0.8 }}
                            >
                                Join us today and unlock amazing features
                            </Typography>
                        </Box>

                        <SignupForm />
                    </Box>
                </Container>
            </Stack>
        </Box>
    )
}