import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function AboutSection() {
  return (
    <Box sx={{ mt: 12, mb: 8, p: 4, backgroundColor: "#ffffff", borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Hi, I’m Mohd. Gouse Shaikh.
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "text.secondary", mb: 2 }}>
        I’m a Java developer with 3 years of experience specializing in backend development. I have a strong foundation in Java
        and extensive knowledge of React for building user-friendly web applications.
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "text.secondary", mb: 2 }}>
        I love writing clean, maintainable code and designing scalable backend systems. My experience includes building RESTful APIs,
        integrating databases, and optimizing performance for large-scale applications.
      </Typography>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Key Skills:
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Java, Spring Boot, RESTful APIs, Microservices" />
        </ListItem>
        <ListItem>
          <ListItemText primary="React, JavaScript, Frontend-Backend Integration" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Database Design & Optimization (MySQL, MongoDB)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Docker, CI/CD, Version Control (Git)" />
        </ListItem>
      </List>
      <Typography sx={{ lineHeight: 1.8, color: "text.secondary", mt: 2 }}>
        I’m passionate about continuous learning, collaborating with cross-functional teams, and contributing to open-source projects.
        I thrive in challenging environments and enjoy solving complex problems with efficient and elegant solutions.
      </Typography>
    </Box>
  );
}