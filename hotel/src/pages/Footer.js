import React from "react";
import "../index.css";
const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">About Us</h2>
      <p className="footer-description">
        Discover Dine. Daelight! 🍽️ Find the best restaurants and book tables
        effortlessly with real-time availability. Enjoy hassle-free
        reservations, explore curated menus, read verified reviews, and unlock
        exclusive deals.Whether it’s fine dining, a cozy café, or a special
        occasion, we bring you the top culinary experiences. With personalized
        recommendations tailored to your taste, every meal becomes memorable.
        Your next great dining experience starts here reserve now!😊
      </p>
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li>
              FAQ
            </li>
            <li>
              Terms & conditions
            </li>
            <li>
              Feedback
            </li>
            <li>
              Contact
            </li>
            <li>
              Locations
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Manage reservation</h3>
          <ul>
            <li>
    View Booking
            </li>
            <li>
              Modify Reservation
            </li>
            <li>
              Cancel Booking
            </li>
            <li>
      TableTrack
            </li>
            <li>
              Special Requests
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Head Office</h3>
          <p>123, Foodie Street, Theni, India</p>
          <p>Email: support@restaurantdineout.com</p>
          <p>Phone: +91 9025475059 📞</p>
        </div>
      </div>
      <p className="footer-border">
        © 2025 Foodie reservations. All Rights Reserved.
      </p>
    </footer>
  );
};
export default Footer;
