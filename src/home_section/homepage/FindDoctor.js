import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PopupPage from './PopupPage';
import '../styles/FindDoctor.css';
import { fetchDoctors } from '../services/api';
import Spinner from '../components/Spinner';

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    top_expertise: '',
    experience: '',
    name: '',
  });
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State for popup

  const loadDoctors = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDoctors(page, filters);
      setDoctors((prev) =>
        reset
          ? response
          : [
              ...prev.filter(
                (prevDoc) => !response.some((newDoc) => newDoc.user === prevDoc.user)
              ),
              ...response,
            ]
      );
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to load doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setPage(1);
    loadDoctors(true);
  };

  const handleDoctorClick = (doctorId) => {
    setSelectedDoctorId(doctorId); // Open popup with selected doctor ID
  };

  const handleClosePopup = () => {
    setSelectedDoctorId(null); // Close the popup
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div className="find-doctor">
      <Navbar />
      <div className="filters-container">
        <h2>Filter Doctors</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Top Expertise"
            name="top_expertise"
            value={filters.top_expertise}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            placeholder="Years of Experience"
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Doctor's Name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <button
            className="apply-filters-btn"
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply Filters'}
          </button>
        </div>
      </div>
      <div className="cards-container">
        {loading && <Spinner />}
        {error && <div className="error-message">{error}</div>}
        {!loading && doctors.length === 0 && !error && (
          <div className="empty-state">No doctors found. Try adjusting your filters.</div>
        )}
        {doctors.map((doctor) => (
          <div
            key={doctor.user}
            className="doctor-card"
            onClick={() => handleDoctorClick(doctor.user)}
          >
            <div className="profile-pic">
              {doctor.profile_pic ? (
                <img src={doctor.profile_pic} alt={doctor.name} />
              ) : (
                <div className="placeholder-pic">No Image</div>
              )}
            </div>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p>City: {doctor.city}</p>
              <p>Degree: {doctor.degree}</p>
              <p>Experience: {doctor.experience} years</p>
            </div>
          </div>
        ))}
      </div>
      {selectedDoctorId && (
        <PopupPage doctorId={selectedDoctorId} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default FindDoctor;
