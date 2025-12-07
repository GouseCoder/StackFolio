import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Chip,
  Button,
  CardMedia,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { GitHub, Launch, Edit, Delete } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import { getProjectById, deleteProject } from "../apis/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (authLoading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function loadProject() {
      try {
        const data = await getProjectById(id, token);
        setProject(data);
      } catch (err) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, authLoading, navigate]);

  // DELETE HANDLER
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    const token = localStorage.getItem("token");
    try {
      await deleteProject(id, token);
      alert("Project deleted successfully");
      navigate("/projects");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading || authLoading)
    return (
      <Box display="flex" justifyContent="center" mt={12}>
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 8, textAlign: "center" }}>
        {error}
      </Alert>
    );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6", py: 10 }}>
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            p: { xs: 3, md: 5 },
            backgroundColor: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          {project?.imageUrl && (
            <CardMedia
              component="img"
              image={project.imageUrl}
              alt={project.title}
              sx={{
                borderRadius: 3,
                mb: 4,
                height: 350,
                objectFit: "cover",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            />
          )}

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 2, color: "#1f2937", letterSpacing: 0.5 }}
          >
            {project.title}
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "#e5e7eb" }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.8, fontSize: "1.05rem" }}
          >
            {project.description}
          </Typography>

          {/* Technologies */}
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mb: 5 }}
            justifyContent="flex-start"
          >
            {project.technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                sx={{
                  backgroundColor: "#E0E7FF",
                  color: "#1E3A8A",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  mb: 1,
                  "&:hover": { backgroundColor: "#C7D2FE" },
                }}
              />
            ))}
          </Stack>

          {/* External Links */}
          <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
            {project.githubUrl && (
              <Button
                variant="outlined"
                startIcon={<GitHub />}
                href={project.githubUrl}
                target="_blank"
                sx={{
                  borderColor: "#3B82F6",
                  color: "#3B82F6",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#EBF2FF",
                    borderColor: "#2563EB",
                    color: "#2563EB",
                  },
                }}
              >
                View on GitHub
              </Button>
            )}
            {project.liveDemoUrl && (
              <Button
                variant="contained"
                startIcon={<Launch />}
                href={project.liveDemoUrl}
                target="_blank"
                sx={{
                  backgroundColor: "#3B82F6",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#2563EB" },
                }}
              >
                Live Demo
              </Button>
            )}
          </Stack>

          {/* Admin Controls */}
          {isAdmin && (
            <Stack direction="row" spacing={2} flexWrap="wrap" mt={3}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => navigate(`/projects/edit/${project.id}`)}
                sx={{ textTransform: "none", px: 3, fontWeight: 600 }}
              >
                Edit Project
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={handleDelete}
                sx={{ textTransform: "none", px: 3, fontWeight: 600 }}
              >
                Delete Project
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
