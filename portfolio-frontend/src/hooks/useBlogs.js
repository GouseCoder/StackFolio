import { useEffect, useState, useCallback } from "react";
import { getAllBlogs, deleteBlog } from "../apis/blogs";

export default function useBlogs(token) {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const data = await getAllBlogs(token);
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoadingBlogs(false);
    }
  }, [token]);

  const removeBlog = async (id) => {
    try {
      await deleteBlog(id, token);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loadingBlogs, error, fetchBlogs, removeBlog };
}
