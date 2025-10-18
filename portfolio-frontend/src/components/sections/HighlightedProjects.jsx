import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import ProjectCard from "../projects/ProjectCard";
import { getProjects } from "../../apis/projects";

export default function HighlightedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        // Take only the first 3 projects
        setProjects(data.slice(0, 3));
      } catch (err) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Highlighted Projects
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 4, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mt: 4 }}
        >
          {projects.length > 0 ? (
            projects.map((proj) => (
              <Grid
                item
                key={proj.id}
                sx={{
                  flex: "0 1 320px", 
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProjectCard {...proj} />
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{
                mt: 4,
                color: "text.secondary",
                width: "100%",
                textAlign: "center",
              }}
            >
              No projects available.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}
