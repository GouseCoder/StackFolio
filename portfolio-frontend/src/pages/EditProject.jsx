import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Stack,
  Button,
  Chip,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useProject } from "../hooks/useProjects";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const token = localStorage.getItem("token");

  const { project, loading, error, update } = useProject(id, token);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTechnologies(project.technologies || []);
      setGithubUrl(project.githubUrl || "");
      setLiveDemoUrl(project.liveDemoUrl || "");
      setImageUrl(project.imageUrl || "");
    }
  }, [project]);

  if (authLoading || loading)
    return (
      <Box display="flex" justifyContent="center" mt={12}>
        <CircularProgress size={60} />
      </Box>
    );

  if (!user || user.role !== "ADMIN") navigate("/");

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 8, textAlign: "center" }}>
        {error}
      </Alert>
    );

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, technologies, githubUrl, liveDemoUrl, imageUrl };
    try {
      await update(payload);
      alert("Project updated successfully!");
      navigate(`/projects/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6", py: 10 }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Edit Project
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField label="Project Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
              <TextField label="Description" fullWidth multiline minRows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
              <TextField label="Image URL" fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              <TextField label="GitHub URL" fullWidth value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
              <TextField label="Live Demo URL" fullWidth value={liveDemoUrl} onChange={(e) => setLiveDemoUrl(e.target.value)} />

              {/* Technologies */}
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField label="Add Technology" value={techInput} onChange={(e) => setTechInput(e.target.value)} fullWidth />
                <Button variant="contained" onClick={handleAddTech}>
                  Add
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {technologies.map((tech) => (
                  <Chip key={tech} label={tech} onDelete={() => handleRemoveTech(tech)} sx={{ mb: 1 }} />
                ))}
              </Stack>

              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Update Project
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
