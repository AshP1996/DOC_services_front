import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <p>
          Contact Us: <a href="mailto:contact@yourcompany.com">contact@yourcompany.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
