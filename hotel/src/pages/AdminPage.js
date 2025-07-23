import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    image: "",
    rating: "",
    tags: "",
    offer: "",
    openTime: "",
    amount: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/restaurants");
      setRestaurants(res.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      location: "",
      image: "",
      rating: "",
      tags: "",
      offer: "",
      openTime: "",
      amount: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantData = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
      amount: Number(form.amount),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/restaurants/${editId}`, restaurantData);
      } else {
        await axios.post("http://localhost:5000/restaurants", restaurantData);
      }
      resetForm();
      fetchRestaurants();
    } catch (err) {
      console.error("Error submitting restaurant:", err);
    }
  };

  const handleEdit = (restaurant) => {
    setEditId(restaurant._id);
    setForm({
      name: restaurant.name,
      location: restaurant.location,
      image: restaurant.image,
      rating: restaurant.rating,
      tags: restaurant.tags?.join(", ") || "",
      offer: restaurant.offer || "",
      openTime: restaurant.openTime || "",
      amount: restaurant.amount?.toString() || "",
      description: restaurant.description || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/restaurants/${id}`);
      fetchRestaurants();
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editId ? "Edit Restaurant" : "Add New Restaurant"}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", maxWidth: "500px" }}>
        {[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "location", label: "Location", type: "text", required: true },
          { name: "image", label: "Image URL", type: "text", required: true },
          { name: "rating", label: "Rating", type: "text", required: true },
          { name: "tags", label: "Tags (comma-separated)", type: "text" },
          { name: "offer", label: "Offer", type: "text" },
          { name: "openTime", label: "Opening Time", type: "text" },
          { name: "amount", label: "Amount (₹)", type: "number" },
        ].map((input) => (
          <div key={input.name} style={{ marginBottom: "10px" }}>
            <label>{input.label}</label>
            <input
              name={input.name}
              type={input.type}
              value={form[input.name]}
              onChange={handleChange}
              required={input.required}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        ))}
        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ marginRight: "10px" }}>
          {editId ? "Update" : "Add"} Restaurant
        </button>
        {editId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>All Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        restaurants.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              maxWidth: "400px",
            }}
          >
            <img
              src={r.image}
              alt={r.name}
              width="100%"
              height="200"
              style={{ objectFit: "cover", borderRadius: "5px" }}
            />
            {r.description && (
              <p style={{ margin: "10px 0", fontStyle: "italic" }}>{r.description}</p>
            )}
            <h3>{r.name}</h3>
            <p><b>Location:</b> {r.location}</p>
            <p><b>Rating:</b> {r.rating}</p>
            <p><b>Tags:</b> {r.tags?.join(", ") || "-"}</p>
            <p><b>Offer:</b> {r.offer || "-"}</p>
            <p><b>Open Time:</b> {r.openTime || "-"}</p>
            <p><b>Amount:</b> ₹{r.amount || "-"}</p>
            <button onClick={() => handleEdit(r)} style={{ marginRight: "10px" }}>Edit</button>
            <button onClick={() => handleDelete(r._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
