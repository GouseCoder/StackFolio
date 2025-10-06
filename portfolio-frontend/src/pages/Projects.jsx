import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8083/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{
          color: "primary.main",
          mb: 4,
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        My Projects
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress size={60} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 4, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard
                id={project.id}
                title={project.title}
                technologies={project.technologies}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}