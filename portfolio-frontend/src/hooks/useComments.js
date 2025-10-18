import { useEffect, useState } from "react";
import { getComments, addComment } from "../apis/comments";

export default function useComments(blogId, token) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const loadComments = async () => {
      try {
        const data = await getComments(blogId, token);
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [blogId, token]);

  const postComment = async (message, author) => {
    if (!token) return;
    const newComment = { author, message };
    const saved = await addComment(blogId, newComment, token);
    setComments((prev) => [saved, ...prev]);
  };

  return { comments, loading, postComment };
}
