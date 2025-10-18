import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Stack, Box } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createBlog } from "../apis/blogs";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CKEditorUploadPlugin } from "../utils/CKEditorUploadAdapter";

export default function AddBlog() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      navigate("/blogs");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createBlog({ title, content }, token);
      alert("Blog created successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Create New Blog
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden" }}>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {
              CKEditorUploadPlugin(editor, token); // attach adapter
            }}
            onChange={(event, editor) => setContent(editor.getData())}
            config={{
              toolbar: [
                "heading", "|", "bold", "italic", "underline",
                "fontSize", "fontColor", "fontBackgroundColor", "link",
                "bulletedList", "numberedList", "blockQuote",
                "insertTable", "imageUpload", "undo", "redo"
              ],
              image: {
                toolbar: ['imageTextAlternative','imageStyle:full','imageStyle:side']
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/blogs')} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={saving || !title || !content}>
            {saving ? "Publishing..." : "Publish"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
