import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookTablePage = () => {
  const { city } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/restaurants");
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error.message);
      }
    };
    fetchRestaurants();
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.name;
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesCity = !city || r.location.toLowerCase().includes(city.toLowerCase());
    const matchesFilter =
      selectedFilters.length === 0 ||
      selectedFilters.some((f) => r.tags?.includes(f));
    return matchesCity && matchesFilter;
  });

  return (
    <div style={{ display: "flex", padding: "1rem" }}>
     
      <div style={{ width: "250px", marginRight: "2rem" }}>
        <h3>Filters</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            "Dineout Pay",
            "Pure Veg",
            "5 Star",
            "Buffet",
            "Beverages",
            "North Indian",
            "Fast Food",
            "South Indian",
            "Chinese",
            "Biriyani",
            "Casual drink",
            "Breakfast",
            "Best Pure Veg",
            "Best non Veg",
            "BBQ Special",
            "Best Dessert",
            "Best Fine dine",
            "Air conditioner",
            "Wallet Accepted",
            "Card Accepted",
          ].map((filter) => (
            <li key={filter}>
              <label>
                <input
                  type="checkbox"
                  name={filter}
                  onChange={handleFilterChange}
                  checked={selectedFilters.includes(filter)}
                />{" "}
                {filter}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Restaurants {city ? `in ${city}` : "All Locations"}</h2>
        {filteredRestaurants.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {filteredRestaurants.map((r) => (
              <div
                key={r._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  width: "250px",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <Link to={`/restaurant/${r._id}`}>
                  <img
                    src={r.image}
                    alt={r.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                </Link>
                <h3>{r.name}</h3>
                <p>{r.location}</p>
                <span>⭐ {r.rating}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default BookTablePage;
