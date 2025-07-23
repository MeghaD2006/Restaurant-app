const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");


router.post("/", async (req, res) => {
  const newBooking = new Booking(req.body);
  await newBooking.save();
  res.status(201).json({ message: "Booking successful!" });
});

module.exports = router;
