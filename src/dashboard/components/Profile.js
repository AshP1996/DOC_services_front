import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import '../styles/profile.css';  // Include this for the CSS

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken || !userId) {
        setError("User is not authenticated. Please login again.");
        return;
      }

      try {
        const response = await getProfile(userId, accessToken);
        setProfileData(response);
      } catch (err) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profileData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>Profile Details</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {profileData.name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Degree:</strong> {profileData.degree}</p>
        <p><strong>Experience:</strong> {profileData.experience} years</p>
        <p><strong>Top Expertise:</strong> {profileData.top_expertise}</p>
        <p><strong>Phone Number:</strong> {profileData.phone_number}</p>
        <p><strong>Description:</strong> {profileData.description}</p>
        <p><strong>Hospital:</strong> {profileData.hospital}</p>
        <p><strong>Fees:</strong> ${profileData.fees}</p>
        <p><strong>Address:</strong> {profileData.address}, {profileData.city}, {profileData.area}</p>
        <p><strong>Rating:</strong> {profileData.rating}</p>
      </div>
      <div>
        <h3>Services</h3>
        <ul>
          {profileData.services?.length > 0 ? (
            profileData.services.map((service) => <li key={service.id}>{service.service_name}</li>)
          ) : (
            <p>No services available</p>
          )}
        </ul>
        <h3>Entities</h3>
        <ul>
          {profileData.entities?.length > 0 ? (
            profileData.entities.map((entity) => (
              <li key={entity.id}>{entity.entity_type}: {entity.entity_value}</li>
            ))
          ) : (
            <p>No entities available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
