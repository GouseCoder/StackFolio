// src/components/AddProjectModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { createProject } from "../../apis/projects";

export default function AddProjectModal({ open, handleClose, onProjectAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveDemoUrl: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
      };
      const newProject = await createProject(payload, token);
      onProjectAdded(newProject); // refresh parent list
      handleClose();
    } catch (err) {
      console.error("Failed to create project:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={700}>Add New Project</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Technologies (comma separated)"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="GitHub URL"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Live Demo URL"
            name="liveDemoUrl"
            value={formData.liveDemoUrl}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
