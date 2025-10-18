// src/apis/blogs.js
import axios from "axios";

const API_BASE = "http://localhost:8082/api/blogs";

export const getAllBlogs = async (token) => {
  const response = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBlog = async (id, token) => {
  const response = await axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createBlog = async (blogData, token) => {
  const response = await axios.post(API_BASE, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBlog = async (id, blogData, token) => {
  const response = await axios.put(`${API_BASE}/${id}`, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteBlog = async (id, token) => {
  await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
