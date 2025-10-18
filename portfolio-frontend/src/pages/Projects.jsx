import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Fab,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCard from "../components/projects/ProjectCard";
import AddProjectModal from "../components/projects/AddProjectModal";
import { getProjects } from "../apis/projects";
import useAuth from "../hooks/useAuth";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 12,
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{
            color: "primary.main",
            mb: 4,
            textShadow: "1px 1px 3px rgba(0,0,0,0.15)",
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
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
            sx={{ mt: 4 }}
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <Grid
                  item
                  sx={{
                    flex: "0 1 320px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={project.id}
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    technologies={project.technologies}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ mt: 4, color: "text.secondary" }}>
                No projects found.
              </Typography>
            )}
          </Grid>
        )}
      </Container>

      {/* Floating + Button */}
      {user?.role === "ADMIN" && (
        <>
          <Tooltip title="Add Project">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpenModal(true)}
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 2000,
                boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

          {/* Modal */}
          <AddProjectModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            onProjectAdded={handleProjectAdded}
          />
        </>
      )}
    </>
  );
}
