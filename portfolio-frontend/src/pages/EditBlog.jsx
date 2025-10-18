// src/pages/EditBlog.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getBlog, updateBlog } from "../apis/blogs";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Check admin access
  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      navigate("/blogs");
    }
  }, [user, loading, navigate]);

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id, token);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoadingBlog(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateBlog(id, { title, content }, token);
      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingBlog)
    return (
      <Box display="flex" justifyContent="center" mt={12}>
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 12 }}>
        {error}
      </Alert>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Edit Blog
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "fontSize",
                "fontColor",
                "fontBackgroundColor",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "insertTable",
                "imageUpload",
                "undo",
                "redo",
              ],
              image: {
                toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
              },
            }}
          />
        </Box>

        <Box textAlign="right" sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/blogs/${id}`)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={saving || !title || !content}
          >
            {saving ? "Updating..." : "Update"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
