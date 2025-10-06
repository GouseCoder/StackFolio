import React from "react";
import { Container, Typography } from "@mui/material";

export default function Blog() {
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 8, textAlign: "center" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Blog
      </Typography>
      <Typography>Coming soon! 🚀</Typography>
    </Container>
  );
}
