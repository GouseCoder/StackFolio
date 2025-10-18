import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment("");
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Leave a Comment
      </Typography>
      <TextField
        multiline
        minRows={3}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!comment.trim()}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}
