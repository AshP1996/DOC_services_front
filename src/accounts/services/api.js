import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/accounts";

const handleError = (error) => {
  const errorMessage = error.response?.data?.detail || "An error occurred";
  console.error("API Error:", errorMessage); // Log for debugging
  throw new Error(errorMessage);
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup/`, data);
    return saveUserData(response.data);
  } catch (error) {
    handleError(error);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, data);
    return saveUserData(response.data);
  } catch (error) {
    handleError(error);
  }
};

const saveUserData = (data) => {
  const { access, refresh, user } = data;

  // Save tokens and user data to localStorage or a secure store
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userType", user.user_type);

  // Set the Authorization header for future API calls
  setAuthToken(access);

  return data;
};

// Helper to set Authorization header for future API calls
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
