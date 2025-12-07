import { Box, Paper, Grid, Typography } from "@mui/material";
import AuthForm from "../components/auth/AuthForm";
import { registerUser } from "../apis/auth";

const SignupPage = () => {
  const handleSignup = async (formData) => {
    const res = await registerUser(formData);
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
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            minHeight: { xs: "auto", md: 550 },
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          {/* Left side graphic */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #7b1fa2, #ba68c8)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              p: { xs: 4, sm: 6, md: 4 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.3rem" },
                lineHeight: 1.2,
              }}
            >
              Join Us Today!
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: 350,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Create your account to start managing your projects and collaborate
              with me.
            </Typography>
          </Grid>

          {/* Right side form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              p: { xs: 3, sm: 4, md: 5 },
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
