import React from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../apis/auth";

const LoginPage = () => {
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
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 900,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Grid container sx={{ height: 500 }}>
          {/* Left side */}
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
              p: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Welcome Back!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, maxWidth: 300, textAlign: "center" }}>
              Log in to access your dashboard and manage your account.
            </Typography>
          </Grid>

          {/* Right side */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              p: 4,
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