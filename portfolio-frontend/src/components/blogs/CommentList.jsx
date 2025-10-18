import { Typography, Paper, Stack, Box } from "@mui/material";

export default function CommentList({ comments = [] }) {
  if (!comments.length) {
    return <Typography color="text.secondary">No comments yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {comments.map((c) => (
        <Paper
          key={c.id || Math.random()}
          elevation={1}
          sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight={600}>
              {c.author || "Anonymous"}
            </Typography>
            {c.createdAt && (
              <Typography variant="caption" color="text.secondary">
                {new Date(c.createdAt).toLocaleString()}
              </Typography>
            )}
          </Box>

          <Typography
            variant="body1"
            sx={{ mt: 1, whiteSpace: "pre-line", wordBreak: "break-word" }}
          >
            {c.message}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
}
