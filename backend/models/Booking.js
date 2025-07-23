const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  restaurantId: String,
  guestName: String,
  mobile: String,
  email: String,
  date: String,
  time: String,
  guestCount: Number,
  payment: String,
  offer: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
