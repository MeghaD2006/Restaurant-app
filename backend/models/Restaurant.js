const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: String, required: true },
  tags: [String],
  offer: { type: String },
  openTime: { type: String },
  amount: { type: Number },
  description: { type: String },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
