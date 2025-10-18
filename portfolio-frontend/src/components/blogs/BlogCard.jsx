import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog, isAdmin, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card elevation={3}>
      <CardActionArea onClick={() => navigate(`/blogs/${blog.id}`)}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {blog.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </CardActionArea>

      {isAdmin && (
        <Stack direction="row" justifyContent="flex-end" sx={{ p: 1 }}>
          <Tooltip title="Edit Blog">
            <IconButton
              color="primary"
              onClick={() => navigate(`/blogs/edit/${blog.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Blog">
            <IconButton color="error" onClick={() => onDelete(blog.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Card>
  );
}
