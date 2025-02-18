import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchDoctors = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctor/all-doctor-profiles/`, {
      params: { limit: 10, offset: (page - 1) * 10 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};
