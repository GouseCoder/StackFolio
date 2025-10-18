import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import AddBlog from "../pages/AddBlog";
import EditBlog from "../pages/EditBlog";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import EditProject from "../pages/EditProject";
import useAuth from "../hooks/useAuth";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loading spinner

  return user ? children : <Navigate to="/login" />;
}

// AdminRoute component
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user?.role === "ADMIN" ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          !localStorage.getItem("token") ? <LoginPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/signup"
        element={
          !localStorage.getItem("token") ? <SignupPage /> : <Navigate to="/" />
        }
      />

      {/* Protected Blog Routes */}
      <Route
        path="/blogs/add"
        element={
          <ProtectedRoute>
            <AddBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/edit/:id"
        element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        }
      />

      {/* Admin Project Routes */}
      <Route
        path="/projects/edit/:id"
        element={
          <AdminRoute>
            <EditProject />
          </AdminRoute>
        }
      />

      {/* Example Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <h1 style={{ textAlign: "center", marginTop: "40px" }}>
              Welcome to your Dashboard 🎉
            </h1>
          </ProtectedRoute>
        }
      />

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
