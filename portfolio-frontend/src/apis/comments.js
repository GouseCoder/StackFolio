import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

export const getComments = async (blogId, token) => {
  const { data } = await axios.get(`${API_BASE_URL}/blogs/${blogId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addComment = async (blogId, commentDto, token) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/blogs/${blogId}/comments`,
    commentDto,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
