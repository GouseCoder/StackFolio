import { useState, useEffect } from "react";
import { getProjectById, updateProject, deleteProject } from "../apis/projects";

export function useProject(id, token) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id, token);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, token]);

  const update = async (updatedData) => {
    try {
      const data = await updateProject(id, updatedData, token);
      setProject(data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const remove = async () => {
    try {
      await deleteProject(id, token);
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return { project, loading, error, update, remove };
}
