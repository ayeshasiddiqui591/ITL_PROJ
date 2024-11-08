import React from 'react';
import './App.css'; // Import CSS file for styling

const Footer = () => {
  return (
    <section id="contact">
    <footer className="footer">
      <div className="footer-container">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Phone: +123456789</p>
          <p>Email: example@example.com</p>
          <p>Instagram: @example_instagram</p>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.instagram.com/example_instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.facebook.com/example_facebook" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com/example_twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Far-E-Wala. All rights reserved.</p>
      </div>
    </footer>
    </section>
  );
};

export default Footer;