import { Box, Typography, Button, Grid, Avatar } from "@mui/material";
import profilePic from "../../assets/images/profile.jpg";

export default function IntroSection({ onResumeClick }) {
  return (
    <Grid container spacing={30} alignItems="center">
      <Grid
        item
        xs={12}
        md={7}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Mohammed Gouse Shaikh
        </Typography>
        <Typography variant="h5" color="text.primary">
          Java Developer
        </Typography>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Backend Specialist
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3B82F6", "&:hover": { backgroundColor: "#2563EB" } }}
            href="/projects"
          >
            View Projects
          </Button>

          <Button
            variant="outlined"
            sx={{ borderColor: "#3B82F6", color: "#3B82F6", "&:hover": { borderColor: "#2563EB", color: "#2563EB" } }}
            href="/resume.pdf"
            download
            onClick={onResumeClick}
          >
            Download Resume
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Avatar alt="Gouse Shaikh" src={profilePic} sx={{ width: 260, height: 260, boxShadow: 3 }} />
      </Grid>
    </Grid>
  );
}