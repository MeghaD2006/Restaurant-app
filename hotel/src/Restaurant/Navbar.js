import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurants from "./RestaurantsData";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    "Please type location"
  );
  const navigate = useNavigate();
  const cities = [
    ...new Set(
      restaurants.map((restaurant) =>
        restaurant.location.split(",").pop().trim()
      )
    ),
  ];

  const handleCitySelect = (city) => {
    setSelectedLocation(city);
    setShowDropdown(false);
    navigate(`/book-table/${encodeURIComponent(city)}`);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.LogoContainer}>
          <h1 style={styles.logo}>😋Dineout</h1>
          <div style={styles.dropdownContainer}>
            <button
              style={styles.dropdownButton}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {selectedLocation} ▼
            </button>
            {showDropdown && (
              <div style={styles.dropdown}>
                {cities.map((city, index) => (
                  <div
                    key={index}
                    style={styles.dropdownItem}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => navigate("/")}>
            🏠 Home
          </button>
          <button style={styles.button} onClick={() => navigate("/book-table")}>
            Book a Table
          </button>
          <button style={styles.loginButton} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  loginButton: {
    padding: "5px 14px",
    backgroundColor: "red",
    color: "black",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  LogoContainer: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "red",
    margin: 0,
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  button: {
    padding: "0.5rem 1rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownButton: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    marginTop: "0.5rem",
  },
  dropdownItem: {
    padding: "0.5rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#333",
    borderBottom: "1px solid #f1f1f1",
  },
};

export default Navbar;
