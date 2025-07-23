const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const restaurantRoutes = require("./routes/restaurantRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    createAdminIfNotExists();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Auto-create default admin if not exists
const createAdminIfNotExists = async () => {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
      });
      await admin.save();
      console.log("✅ Default admin created");
    }
  } catch (error) {
    console.error("❌ Admin creation error:", error.message);
  }
};

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

// Mount Routes
app.use("/restaurants", restaurantRoutes);
app.use("/bookings", bookingRoutes);
app.use("/bookings", bookingRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("🍽️ Restaurant Booking API is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
