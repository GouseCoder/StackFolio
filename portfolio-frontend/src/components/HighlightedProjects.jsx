import { Box, Typography, Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

export default function HighlightedProjects() {
  const projects = [
    { id: 1, title: "E-commerce Platform", technologies: ["JavaScript", "React", "Node.js", "MongoDB"] },
    { id: 2, title: "Chat Application", technologies: ["React", "Firebase", "TailwindCSS"] },
    { id: 3, title: "Inventory Management", technologies: ["Spring Boot", "MySQL", "Docker"] },
  ];

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Highlighted Projects
      </Typography>
      <Grid container spacing={4} mt={4}>
        {projects.map((proj) => (
          <Grid item xs={12} md={4} key={proj.id}>
            <ProjectCard {...proj} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
