import React, { useEffect, useState } from 'react';
import '../styles/PopupPage.css';

const PopupPage = ({ doctorId, onClose }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://127.0.0.1:8000/api/doctor/public-doctor-profiles/${doctorId}/`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          setError('No data found for this doctor.');
        } else {
          setDoctorDetails(data);
        }
      } catch (err) {
        console.error('Error fetching doctor details:', err);
        setError('Failed to fetch doctor details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  if (!doctorId) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <button className="popup-close-btn" onClick={onClose}>
          &times;
        </button>
        {loading ? (
          <p>Loading doctor details...</p>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="popup-header">
              {doctorDetails.profile_pic ? (
                <img src={doctorDetails.profile_pic} alt="Doctor Profile" className="doctor-profile-pic" />
              ) : (
                <div className="default-profile-pic">No Image</div>
              )}
              <h2>{doctorDetails.name}</h2>
            </div>

            {/* Details Section */}
            <div className="popup-details">
              <p><strong>Degree:</strong> {doctorDetails.degree}</p>
              <p><strong>Experience:</strong> {doctorDetails.experience} years</p>
              <p><strong>Top Expertise:</strong> {doctorDetails.top_expertise || 'Not available'}</p>
              <p><strong>Phone Number:</strong> {doctorDetails.phone_number}</p>
              <p><strong>Email:</strong> {doctorDetails.email}</p>
              <p><strong>Description:</strong> {doctorDetails.description || 'No description available'}</p>
              <p><strong>Hospital:</strong> {doctorDetails.hospital || 'Not available'}</p>
              <p><strong>City:</strong> {doctorDetails.city || 'Not available'}</p>
              <p><strong>Address:</strong> {doctorDetails.address || 'Not available'}</p>
              <p><strong>Fees:</strong> {doctorDetails.fees ? `$${doctorDetails.fees}` : 'Not available'}</p>
              <p><strong>Verified:</strong> {doctorDetails.is_verified ? 'Yes' : 'No'}</p>
              <p><strong>Rating:</strong> {doctorDetails.rating.toFixed(1)}</p>
            </div>

            {/* Services & Entities Section */}
            <div className="popup-services">
              {doctorDetails.services && doctorDetails.services.length > 0 ? (
                <div>
                  <h3>Services</h3>
                  <ul>
                    {doctorDetails.services.map((service, index) => (
                      <li key={service.id}>{service.service_name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No Services Available</p>
              )}

              {doctorDetails.entities && doctorDetails.entities.length > 0 ? (
                <div>
                  <h3>Entities</h3>
                  <ul>
                    {doctorDetails.entities.map((entity, index) => (
                      <li key={entity.id}>{entity.entity_type}: {entity.entity_value}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No Entities Available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupPage;
