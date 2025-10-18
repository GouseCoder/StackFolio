import React from "react";
import { Container, Typography, Box, Grid, Chip, Divider } from "@mui/material";

const skills = {
  backend: ["Java", "Spring Boot", "REST APIs", "Microservices"],
  frontend: ["React", "JavaScript", "HTML5", "CSS3", "MUI"],
  database: ["MySQL", "MongoDB"],
  tools: ["Git", "Docker", "Postman", "CI/CD"],
};

const experience = [
  "Built scalable RESTful APIs for e-commerce and chat applications.",
  "Developed microservices architecture for high-traffic backend systems.",
  "Integrated frontend and backend using React and RESTful APIs.",
  "Optimized database queries and improved performance of existing applications.",
];

export default function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 8 }}>
      {/* Page Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        About Me
      </Typography>

      {/* Introduction */}
      <Typography sx={{ mb: 4, lineHeight: 1.8, color: "text.primary" }}>
        I'm Mohd. Gouse Shaikh, a passionate Java Developer with 3 years of
        experience building scalable web applications and backend systems.
        I enjoy solving complex problems, optimizing performance, and learning
        new technologies.
      </Typography>

      {/* Skills Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Technical Skills
        </Typography>
        <Grid container spacing={1}>
          {Object.entries(skills).map(([category, techs]) => (
            <Grid item xs={12} sm={6} key={category}>
              <Typography fontWeight={600} sx={{ mt: 1 }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {techs.map((tech) => (
                  <Chip key={tech} label={tech} color="primary" variant="outlined" />
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Experience / Career Highlights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Career Highlights
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          {experience.map((item, index) => (
            <li key={index}>
              <Typography sx={{ mb: 1 }}>{item}</Typography>
            </li>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Personal / Work Style */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Work Style & Interests
        </Typography>
        <Typography sx={{ mb: 1, lineHeight: 1.8 }}>
          I enjoy working in collaborative environments, solving challenging problems,
          and continuously improving my skills. Outside of development, I like reading tech blogs,
          experimenting with new frameworks, and contributing to open-source projects.
        </Typography>
      </Box>
    </Container>
  );
}
