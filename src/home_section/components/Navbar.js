import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">MyWebsite</div>
        <div className="nav-buttons">
          <button className="nav-button">Notifications</button>
          <button className="nav-button">Login</button>
        </div>
      </nav>
      <footer className="footer">
        <p>Contact Us: email@example.com | Phone: +123 456 7890</p>
        <p>© 2025 MyWebsite. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Navbar;
