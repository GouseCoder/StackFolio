import React from "react";
import { Box, Paper, Grid, Typography, useMediaQuery } from "@mui/material";
import AuthForm from "../components/auth/AuthForm";
import { loginUser } from "../apis/auth";
import { useTheme } from "@mui/material/styles";

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogin = async (formData) => {
    const res = await loginUser(formData);
    localStorage.setItem("token", res.token);
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        p: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              p: { xs: 4, sm: 5 },
              height: { xs: "auto", md: 500 },
              textAlign: "center",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Welcome Back!
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: 300,
                textAlign: "center",
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Log in to access your dashboard and manage your account.
            </Typography>
          </Grid>

          {/* Right Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              p: { xs: 3, sm: 4 },
              height: { xs: "auto", md: 500 },
            }}
          >
            <AuthForm mode="login" onSubmit={handleLogin} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoginPage;
