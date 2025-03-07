import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import restaurants from "../Restaurant/RestaurantsData";
const BookTablePage = () => {
  const { city } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleFilterChange = (event) => {
    const filterName = event.target.name;
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filterName)
        ? prevFilters.filter((f) => f !== filterName)
        : [...prevFilters, filterName]
    );
  };
  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (
      city &&
      !restaurant.location.toLowerCase().includes(city.toLowerCase())
    ) {
      return false;
    }

    if (selectedFilters.length === 0) return true;
    return selectedFilters.some(
      (filter) => restaurant.tags && restaurant.tags.includes(filter)
    );
  });
  const finalRestaurants =
    filteredRestaurants.length > 0
      ? filteredRestaurants
      : restaurants.slice(0, 1);
  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        <h3> Quick Filters</h3>
        <ul>
          <li>
            <input
              type="checkbox"
              name="Dineout Pay"
              onChange={handleFilterChange}
            />
            Dineout Pay
          </li>

          <li>
            <input
              type="checkbox"
              name="Pure Veg"
              onChange={handleFilterChange}
            />
            Pure Veg
          </li>

          <li>
            <input
              type="checkbox"
              name="5 Star"
              onChange={handleFilterChange}
            />
            5 Star
          </li>
          <li>
            <input
              type="checkbox"
              name=" Buffet"
              onChange={handleFilterChange}
            />
            Buffet
          </li>
          <li>
            <input
              type="checkbox"
              name=" Beverages"
              onChange={handleFilterChange}
            />
            Beverages
          </li>
        </ul>
        <h3>Cuisines</h3>
        <ul>
          <li>
            <input
              type="checkbox"
              name="North Indian"
              onChange={handleFilterChange}
            />
            North Indian
          </li>

          <li>
            <input
              type="checkbox"
              name="Fast Food"
              onChange={handleFilterChange}
            />
            Fast Food
          </li>
          <li>
            <input
              type="checkbox"
              name="South Indian"
              onChange={handleFilterChange}
            />
            South Indian
          </li>
          <li>
            <input
              type="checkbox"
              name="Chinese"
              onChange={handleFilterChange}
            />
            Chinese
          </li>
          <li>
            <input
              type="checkbox"
              name="Biriyani"
              onChange={handleFilterChange}
            />
            Biriyani
          </li>
        </ul>
        <h3>Tags</h3>
        <ul>
          <li>
            <input
              type="checkbox"
              name="Casual drink"
              onChange={handleFilterChange}
            />
            Casual drink
          </li>
          <li>
            <input
              type="checkbox"
              name=" Breakfast"
              onChange={handleFilterChange}
            />
            Breakfast
          </li>
          <li>
            <input
              type="checkbox"
              name=" Best Pure Veg"
              onChange={handleFilterChange}
            />
            Best Pure Veg
          </li>
          <li>
            <input
              type="checkbox"
              name="Best non Veg"
              onChange={handleFilterChange}
            />
            Best non Veg
          </li>
        </ul>
        <h3>Dining</h3>
        <ul>
          <li>
            <input
              type="checkbox"
              name=" 5 star"
              onChange={handleFilterChange}
            />
            5 star
          </li>
          <li>
            <input
              type="checkbox"
              name="BBQ Special"
              onChange={handleFilterChange}
            />
            BBQ Special
          </li>
          <li>
            <input
              type="checkbox"
              name=" Best Dessert"
              onChange={handleFilterChange}
            />
            Best Dessert
          </li>
          <li>
            <input
              type="checkbox"
              name=" Best Fine dine"
              onChange={handleFilterChange}
            />
            Best fine dine
          </li>
        </ul>
        <div style={styles.over}>
          <h3 onClick={handleDropdownToggle}>Features +</h3>
          {isDropdownOpen && (
            <div style={styles.dropdown_content}>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    name="Air conditioner"
                    onChange={handleFilterChange}
                  />
                  Air conditioner
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Wallet Accepted"
                    onChange={handleFilterChange}
                  />
                  Wallet Accepted
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Card Accepted"
                    onChange={handleFilterChange}
                  />
                  Card Accepted
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div style={styles.restaurants}>
        <h2>Best Restaurant in {city ? `in ${city}` : "All Locations"}</h2>
        <div style={styles.restaurantList}>
          {finalRestaurants.map((restaurant) => (
            <div key={restaurant.id} style={styles.card}>
              <Link to={`/restaurant/${restaurant.id}`}>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  style={styles.image}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </Link>

              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>

              <span style={styles.rating}>{restaurant.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    padding: "1rem",
  },
  filters: {
    flex: "1",
    border: "1px solid #ccc",
    paddingRight: "1rem",
    height: "max-content",
  },
  restaurants: {
    flex: "4",
    paddingLeft: "1rem",
  },
  restaurantList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  },

  rating: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "green",
    color: "#fff",
    padding: "0.2rem 0.5rem",
    borderRadius: "5px",
  },
  imageHover: {
    transform: "scale(1.1)",
  },
};

export default BookTablePage;
