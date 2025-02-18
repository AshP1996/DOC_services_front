import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Fetch profile using the access token for authentication
export const getProfile = async (userId, token) => {
    const response = await axios.get(`${API_BASE_URL}/doctor/doctor-profiles/${userId}/`, {
        headers: {
            Authorization: `Bearer ${token}`,  // Ensure the token is used here for auth
            'Content-Type': 'application/json'
        },
    });
    return response.data;
};

// Update profile using PUT request
export const updateProfile = async (userId, profileData, token) => {
    const response = await axios.put(`${API_BASE_URL}/doctor/doctor-profiles/${userId}/`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  };