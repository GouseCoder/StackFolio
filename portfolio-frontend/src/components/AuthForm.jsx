import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Alert,
  Paper,
  Link,
} from "@mui/material";
import { validateEmail, validatePassword } from "../utils/validation";

const AuthForm = ({ mode, onSubmit }) => {
  const isSignup = mode === "signup";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username.trim()) return setError("Username is required");
    if (isSignup && !validateEmail(formData.email))
      return setError("Enter a valid email");
    if (!validatePassword(formData.password))
      return setError("Password must be at least 6 characters");

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err);
    }
  };

  return (

      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: 380,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" mb={2} fontWeight="bold">
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
          {isSignup && (
            <>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="AUDIENCE">Audience</MenuItem>
              </TextField>
            </>
          )}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        {/* ✅ Forgot Password & Signup Links */}
        {!isSignup && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <Link
                href="/forgot-password"
                underline="hover"
                sx={{ color: "#3B82F6", fontWeight: "bold" }}
              >
                Forgot Password?
              </Link>
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Don’t have an account?{" "}
              <Link
                href="/signup"
                underline="hover"
                sx={{ color: "#3B82F6", fontWeight: "bold" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        )}
      </Paper>
  );
};

export default AuthForm;