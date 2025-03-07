import React, { useState } from "react";
import restaurants from "../Restaurant/RestaurantsData";
import RestaurantCard from "../Restaurant/RestaurantCard";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>
          Discover the Best<span style={styles.text}> Restaurant !</span>
        </h1>
        <input
          type="text"
          placeholder="Search for restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBox}
        />
      </div>
      <h2 style={styles.heading}>Restaurants</h2>
      <div style={styles.container}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants
            .slice(0, 4)
            .map((restaurant, index) => (
              <RestaurantCard key={index} {...restaurant} />
            ))
        ) : (
          <p style={styles.noResults}>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  banner: {
    backgroundImage:
      "url('https://www.dineout.co.in/blog/wp-content/uploads/2019/11/rsz_101.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  bannerTitle: {
    fontSize: "2.5 rem",
    marginBottom: "1rem",
  },
  searchBox: {
    padding: "0,.5rem",

    width: "30%",
    height: "10%",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  searchButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
    marginLeft: "10px",
  },

  text: {
    color: "red",
  },
  heading: {
    textAlign: "center",
    margin: "1rem 0",
    fontSize: "2rem",
    color: "#333",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};

export default HomePage;
