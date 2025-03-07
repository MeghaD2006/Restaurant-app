import React from "react";
import { Link } from "react-router-dom";
const RestaurantCard = ({ image, name, location, rating, id }) => {
  return (
    <div style={styles.card}>
      <div>
        <Link to={`/restaurant/${id}`}>
          <img
            src={image}
            alt={name}
            style={styles.image}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>
      </div>
      <h3>{name}</h3>
      <p>{location}</p>
      <p style={styles.rating}>⭐{rating}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
    width: "200px",
    textAlign: "center",
    margin: "0.5rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1) ",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
    transition: "transform 0.3s ease-in-out",
  },
  rating: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  imageHover: {
    transform: "scale(1.1)",
  },
};
export default RestaurantCard;
