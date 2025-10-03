import React from "react";
// React Router
import { useNavigate } from "react-router-dom";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #094BB0 0%, #569CF9 100%)",
        display: "flex",
        alignItems: "center",

      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={20}
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
            height: "100%",
            py: 2,
          }}
        >
          {/* النصوص */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                color: "white",
                px: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  mb: 2,
                  background: "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                PixelsDB
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  mb: 3,
                  lineHeight: 1.6,
                  opacity: 0.9,
                  maxWidth: "500px",
                  mx: { xs: "auto", md: 0 },
                }}
              >
                PixelsDB helps you chat with your database. Write natural language,
                get SQL instantly, and explore your data with ease.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  maxWidth: { xs: "250px", sm: "none" },
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <Button
                  onClick={() => navigate("/signup")}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 3,
                    py: 1,
                    backgroundColor: "primary.contrastText",
                    color: "primary.main",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: "bold",
                    borderRadius: 2,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                    },
                    transition: "all 0.3s ease",
                    minWidth: { xs: "180px", sm: "auto" },
                  }}
                >
                  Get Started
                </Button>

                <Button
                  onClick={() => navigate("/login")}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: "bold",
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    minWidth: { xs: "180px", sm: "auto" },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* الصورة */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src="../../../public/WelcomeImg.png"
                alt="Database Visualization"
                sx={{
                  width: "100%",
                  maxWidth: { xs: "250px", sm: "350px", md: "550px" },
                  maxHeight: { xs: "250px", sm: "350px", md: "500px" },
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transform: { xs: "none", md: "perspective(1000px) rotateY(-5deg)" },
                  transition: "all 0.5s ease",
                  "&:hover": {
                    transform: { xs: "scale(1.02)", md: "perspective(1000px) rotateY(0deg) scale(1.02)" },
                  },
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              {/* تأثيرات زخرفية - مخفية على الموبايل لتوفير المساحة */}
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                  display: { xs: "none", md: "block" },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}