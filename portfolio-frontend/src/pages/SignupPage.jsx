import { Box, Paper, Grid, Typography } from "@mui/material";
import AuthForm from "../components/auth/AuthForm";
import { registerUser } from "../apis/auth";

const SignupPage = () => {
  const handleSignup = async (formData) => {
    const res = await registerUser(formData);
    localStorage.setItem("token", res.token);
    window.location.href = "/"; // redirect after success
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6", // light gray background
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
        <Grid container sx={{ height: 520 }}>
          {/* Left side */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #7b1fa2, #ba68c8)", // purple gradient
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              p: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Join Us Today!
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2, maxWidth: 320, textAlign: "center" }}
            >
              Create your account to start managing your projects and collaborate
              with me.
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
            <AuthForm mode="signup" onSubmit={handleSignup} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SignupPage;