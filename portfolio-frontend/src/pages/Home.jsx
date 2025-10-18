import { Box, Container } from "@mui/material";
import IntroSection from "../components/sections/IntroSection";
import AboutSection from "../components/sections/AboutSection";
import HighlightedProjects from "../components/sections/HighlightedProjects";

export default function Home() {
  const handleResumeClick = (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault();
      window.location.href = "/login";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 15 }}>
        <IntroSection onResumeClick={handleResumeClick} />
        <AboutSection />
        <HighlightedProjects />
      </Container>
    </Box>
  );
}