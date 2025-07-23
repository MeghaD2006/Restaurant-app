const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurants", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurant", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, location, image, rating, tags, offer, openTime, amount, description } = req.body;
    const newRestaurant = new Restaurant({
      name,
      location,
      image,
      rating,
      tags,
      offer,
      openTime,
      amount,
      description,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json({ message: "Error creating restaurant", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, location, image, rating, tags, offer, openTime, amount, description } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, location, image, rating, tags, offer, openTime, amount, description },
      { new: true }
    );
    if (!updatedRestaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ message: "Error updating restaurant", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Restaurant not found" });
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting restaurant", error: err.message });
  }
});

module.exports = router;
