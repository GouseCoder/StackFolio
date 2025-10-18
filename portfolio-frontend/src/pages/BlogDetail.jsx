import React, { useEffect, useState } from "react";
import { Container, Typography, Divider, Alert, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBlogDetail from "../hooks/useBlogDetail";
import LoadingBox from "../components/common/LoadingBox";
import BlogContent from "../components/blogs/BlogContent";
import CommentList from "../components/blogs/CommentList";
import CommentForm from "../components/blogs/CommentForm";
import { getComments, addComment } from "../apis/comments";

export default function BlogDetail() {
  const { id } = useParams(); // blog ID from route
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // Blog details (title, content, etc.)
  const { blog, loading, error } = useBlogDetail(id, token);

  // Local comment state
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      if (!token) {
        setErrorComments("You must be logged in to view comments.");
        setLoadingComments(false);
        return;
      }

      try {
        setLoadingComments(true);
        const data = await getComments(id, token);
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setErrorComments("Failed to load comments.");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [id, token]);

  // Handle comment submission
  const handleAddComment = async (message) => {
    if (!message.trim()) return;

    try {
      const newComment = {
        author: user?.name || "Anonymous",
        message,
      };
      const saved = await addComment(id, newComment, token);
      setComments((prev) => [saved, ...prev]); // prepend newest comment
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };

  // --- Loading / Error states ---
  if (loading) return <LoadingBox size={60} />;
  if (error)
    return (
      <Alert severity="error" sx={{ mt: 12 }}>
        {error}
      </Alert>
    );
  if (!blog)
    return (
      <Typography variant="h6" sx={{ mt: 12 }}>
        Blog not found.
      </Typography>
    );

  // --- Main render ---
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 8 }}>
      {/* Blog title */}
      <Typography variant="h3" fontWeight={700} gutterBottom>
        {blog.title}
      </Typography>

      {/* Timestamp */}
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
        {new Date(blog.createdAt).toLocaleString()}
      </Typography>

      {/* Blog body */}
      <BlogContent content={blog.content} />

      <Divider sx={{ my: 5 }} />

      {/* Comments header */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Comments ({comments?.length || 0})
      </Typography>

      {/* Comments list */}
      {loadingComments ? (
        <Box mt={3}>
          <LoadingBox size={40} />
        </Box>
      ) : errorComments ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {errorComments}
        </Alert>
      ) : (
        <CommentList comments={comments} />
      )}

      {/* Comment input form */}
      {user ? (
        <CommentForm onSubmit={handleAddComment} />
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          You must be logged in to leave a comment.
        </Typography>
      )}
    </Container>
  );
}
