import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {/* Navbar will always be visible except on auth pages if desired */}
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/blog" element={<Blog />} />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <SignupPage /> : <Navigate to="/" />}
        />

        {/* Protected Example Route */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <h1 style={{ textAlign: "center", marginTop: "40px" }}>
                Welcome to your Dashboard 🎉
              </h1>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer stays visible on all pages */}
      <Footer />
    </Router>
  );
}