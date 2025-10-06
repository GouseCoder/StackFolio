import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ProjectCard({ id, title, technologies = [] }) {
  return (
    <Card
      component={Link}
      to={`/projects/${id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        borderRadius: 4,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent sx={{ width: "100%", px: 3 }}>
        {/* Project Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{
            color: "#1f2937", // dark gray
            textTransform: "capitalize",
            letterSpacing: 0.3,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            width: "50px",
            height: "3px",
            backgroundColor: "#3B82F6",
            mx: "auto",
            mb: 2,
            borderRadius: 2,
          }}
        />

        {/* Technologies */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          {technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              sx={{
                mb: 1,
                backgroundColor: "#E0E7FF", // soft blue bg
                color: "#1E40AF",            // blue-800 text
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#C7D2FE",
                },
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}