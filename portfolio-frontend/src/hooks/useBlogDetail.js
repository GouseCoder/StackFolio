import { useEffect, useState, useCallback } from "react";
import { getBlog } from "../apis/blogs";

export default function useBlogDetail(id, token) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    try {
      const data = await getBlog(id, token);
      setBlog(data);
    } catch (err) {
      setError(err.message || "Failed to load blog");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { blog, loading, error, refetch: fetchBlog };
}
