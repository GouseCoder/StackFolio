import React from "react";
import { Card, CardContent, Typography, Chip, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProjectCard({ id, title, technologies = [] }) {
  return (
    <Card
      component={Link}
      to={`/projects/${id}`}
      sx={{
        width: "100%",                // make it fill grid cell
        maxWidth: 320,                // consistent card width
        textDecoration: "none",
        color: "inherit",
        borderRadius: 4,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 3,
        }}
      >
        {/* Project Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            color: "#1f2937",
            textTransform: "capitalize",
            textAlign: "center",
            letterSpacing: 0.3,
            wordWrap: "break-word",       // 🔑 breaks long words
            overflowWrap: "break-word",
            whiteSpace: "normal",         // allows multi-line wrapping
          }}
        >
          {title}
        </Typography>

        {/* Divider */}
        <Box
          sx={{
            width: "50px",
            height: "3px",
            backgroundColor: "#3B82F6",
            borderRadius: 2,
            mb: 1,
          }}
        />

        {/* Technologies */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          {technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              sx={{
                mb: 1,
                backgroundColor: "#E0E7FF",
                color: "#1E40AF",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#C7D2FE" },
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
