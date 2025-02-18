import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Homepage.css';

const Homepage = () => {
  const navigate = useNavigate(); // Call the hook here

  return (
    <div className="homepage">
      <Navbar />
      <section className="hero">
        <h1>this is tag</h1>
        <p>Your health, our priority. Find the right care, anytime, anywhere.</p>
      </section>
      <section className="signup-buttons">
        <button className="signup-doctor">Signup as a Doctor</button>
        <button className="signup-user">Signup as a User</button>
      </section>
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service" onClick={() => navigate('/find-doctor')}>
            Find Doctor
          </div>
          <div className="service">City</div>
          <div className="service">Report Analysis</div>
          <div className="service">Option 1</div>
        </div>
      </section>
      <section className="square-cards">
        <h2>Explore More</h2>
        <div className="cards-container">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card">Card {i + 1}</div>
          ))}
        </div>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet.
        </p>
      </section>
    </div>
  );
};

export default Homepage;
