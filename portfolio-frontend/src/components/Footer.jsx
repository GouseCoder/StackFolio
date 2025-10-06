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
        <IconButton href="https://linkedin.com" target="_blank" color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton
          href="https://github.com/GouseCoder"
          target="_blank"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" color="inherit">
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
        <Link href="/blog" underline="hover" color="inherit">
          Blog
        </Link>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2">
        © {new Date().getFullYear()} Gouse Shaikh
      </Typography>
    </Box>
  );
}
