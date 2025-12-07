import React from "react";
import { Box, Typography, Link, Stack, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor:  "#1f2937",
        color: "#f9fafb",
        py: 4,
        mt: "auto",
        textAlign: "center",
        //borderTop: "1px solid #e5e7eb",
      }}
    >
      {/* Social Icons */}
      <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
        <IconButton href="http://www.linkedin.com/in/mohammed-gouse-shaikh" target="_blank" color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton
          href="https://github.com/GouseCoder"
          target="_blank"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://x.com/sarcasticgoss?t=0sunJBJXQ4CFhpll8UHu4w&s=09" target="_blank" color="inherit">
          <TwitterIcon />
        </IconButton>
      </Stack>

      {/* Footer Nav Links */}
      <Stack direction="row" spacing={3} justifyContent="center" mb={2}>
        <Link href="/" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="/about" underline="hover" color="inherit">
          About
        </Link>
        <Link href="/projects" underline="hover" color="inherit">
          Projects
        </Link>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2">
        © {new Date().getFullYear()} Gouse Shaikh
      </Typography>
    </Box>
  );
}
