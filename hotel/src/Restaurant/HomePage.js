import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestaurantCard from "../Restaurant/RestaurantCard";
import "./HomePage.css";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/restaurants")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div>
      <div className="banner">
        <h1 className="bannerTitle">
          Discover the Best <span className="text">Restaurant!</span>
        </h1>
        <input
          type="text"
          placeholder="Search for restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchBox"
        />
      </div>

      <h2 className="heading">Restaurants</h2>
      <div className="container">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.slice(0, 4).map((restaurant) => (
            <div
              key={restaurant._id}
              onClick={() => handleRestaurantClick(restaurant._id)}
              style={{ cursor: "pointer" }}
            >
              <RestaurantCard {...restaurant} />
            </div>
          ))
        ) : (
          <p className="noResults">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
