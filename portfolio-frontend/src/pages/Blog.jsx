import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Alert,
  Box,
  Fab,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBlogs from "../hooks/useBlogs";
import BlogCard from "../components/blogs/BlogCard";
import DeleteDialog from "../components/blogs/DeleteDialog";
import LoadingBox from "../components/common/LoadingBox";

export default function Blog() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { blogs, loadingBlogs, error, removeBlog } = useBlogs(token);
  const [deleteId, setDeleteId] = useState(null);

  if (loading || loadingBlogs) return <LoadingBox />;

  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
          Blog
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {!error && blogs.length === 0 && (
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
            No blogs yet. {user?.role === "ADMIN" && "Add one using the + button below!"}
          </Typography>
        )}

        {!error && blogs.length > 0 && (
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <BlogCard
                  blog={blog}
                  isAdmin={user?.role === "ADMIN"}
                  onDelete={(id) => setDeleteId(id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {user?.role === "ADMIN" && (
        <Tooltip title="Add Blog">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => navigate("/blogs/add")}
            sx={{ position: "absolute", bottom: 32, right: 32, zIndex: 2000 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}

      <DeleteDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          removeBlog(deleteId);
          setDeleteId(null);
        }}
      />
    </Box>
  );
}
