import React, { useState, useEffect } from 'react';
import { updateProfile } from '../services/api';  // Adjust the path if needed

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    degree: '',
    experience: '',
    phone_number: '',
    email: '',
    description: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    if (!accessToken || !userId) {
      setError('User is not authenticated. Please login again.');
    }

    setProfileData((prev) => ({ ...prev, userId, token: accessToken }));  // Storing tokens for API calls
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      if (accessToken && userId) {
        await updateProfile(userId, profileData, accessToken);
        alert('Profile updated successfully');
      } else {
        setError('Unable to update profile. Please login again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={profileData.name} onChange={handleChange} />
      <label>Degree:</label>
      <input type="text" name="degree" value={profileData.degree} onChange={handleChange} />
      <label>Experience:</label>
      <input type="number" name="experience" value={profileData.experience} onChange={handleChange} />
      <label>Phone Number:</label>
      <input type="text" name="phone_number" value={profileData.phone_number} onChange={handleChange} />
      <label>Email:</label>
      <input type="email" name="email" value={profileData.email} onChange={handleChange} />
      <label>Description:</label>
      <textarea name="description" value={profileData.description} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateProfile;
