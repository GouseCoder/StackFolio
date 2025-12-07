import axios from "axios";

// Prefer CRA-style env var; fall back to localhost for development
const API_BASE_URL = process.env.REACT_APP_USER_SERVICE_URL || "http://localhost:8081";


export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return response.data; // should include token on success
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data; // should include token on success
  } catch (error) {
    throw error.response?.data?.message || "Invalid credentials";
  }
};
