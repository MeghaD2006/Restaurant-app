import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./RestaurantDetails.css";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const [offer, setOffer] = useState("");
  const [date, setDate] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [selectedTime, setSelectedTime] = useState("");

  const [guestName, setGuestName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("Card");
  const [guestCount, setGuestCount] = useState(2);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const timeSlots = {
    Breakfast: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM"],
    Lunch: ["12:00 PM", "12:30 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM"],
    Dinner: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"],
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/restaurants/${id}`).then((res) => {
      setRestaurant(res.data);
    });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    return newErrors;
  };

  const getPerGuestAmount = () => restaurant.amount / 2;

  const getTotalAmount = () => {
    let base = getPerGuestAmount() * guestCount;
    if (offer === "20% off on booking") {
      return Math.round(base * 0.8);
    }
    return base;
  };

  const handleBooking = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setTouched({ mobile: true, email: true });

    if (!guestName || !mobile || !selectedTime || !date) {
      Swal.fire({
        icon: "error",
        title: "Missing Required Fields",
        text: "Please fill in all required fields before booking.",
      });
      return;
    }

    if (guestCount < 2) {
      Swal.fire({
        icon: "warning",
        title: "Minimum Guests Required",
        text: "Please select at least 2 guests to proceed with booking.",
      });
      return;
    }

    if (Object.keys(validationErrors).length === 0) {
      const bookingData = {
        guestName,
        mobile,
        email,
        date,
        time: selectedTime,
        guestCount,
        payment,
        offer,
        amount: getTotalAmount(),
        restaurantId: restaurant._id,
      };

      try {
        await axios.post("http://localhost:5000/bookings", bookingData);

        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          html: `
            <p><b>Name:</b> ${guestName}</p>
            <p><b>Date:</b> ${date}</p>
            <p><b>Time:</b> ${selectedTime}</p>
            <p><b>Guests:</b> ${guestCount}</p>
            <p><b>Offer:</b> ${offer || "None"}</p>
            <p><b>Amount:</b> ₹${getTotalAmount()}</p>
          `,
          confirmButtonText: "OK",
        });

        // Reset form
        setGuestName("");
        setMobile("");
        setEmail("");
        setOffer("");
        setDate("");
        setSelectedTime("");
        setGuestCount(2);
        setPayment("Card");
        setErrors({});
        setTouched({});
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "An error occurred while booking. Please try again.",
        });
      }
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-left">
        <h2>{restaurant.name}</h2>
        <img src={restaurant.image} alt={restaurant.name} />
        <p>{restaurant.description}</p>
        <p><b>Location:</b> {restaurant.location}</p>
        <p><b>Amount:</b> ₹{restaurant.amount} for 2 (approx)</p>
        <p><b>OpenTime:</b> {restaurant.openTime}</p>
        <p><b>Rating:</b> {restaurant.rating}</p>
        <p><b>Offer:</b> {restaurant.offer}</p>
      </div>

      <div className="restaurant-right">
        <h3 className="deal-btn">Select an Offer</h3>

        <label>Select Offer</label>
        <select value={offer} onChange={(e) => setOffer(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Free dessert with meal">Free dessert with meal</option>
          <option value="20% off on booking">20% off on booking</option>
        </select>

        <label>Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Choose Time Slot</label>
        <div className="meal-type-tabs">
          {Object.keys(timeSlots).map((meal) => (
            <div
              key={meal}
              className={`meal-type-tab ${selectedMeal === meal ? "active" : ""}`}
              onClick={() => {
                setSelectedMeal(meal);
                setSelectedTime("");
              }}
            >
              {meal}
            </div>
          ))}
        </div>

        <div className="time-slot-buttons">
          {timeSlots[selectedMeal].map((time) => (
            <button
              key={time}
              className={`time-slot-button ${selectedTime === time ? "active" : ""}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        {selectedTime && (
          <div className="booking-form">
            <h3>Enter Guest Details</h3>
            <p><b>Selected Time Slot:</b> {selectedTime}</p>

            <div className="guest-count">
              <button
                onClick={() => {
                  if (guestCount > 2) setGuestCount(guestCount - 1);
                }}
              >
                -
              </button>
              <span>{guestCount}</span>
              <button onClick={() => setGuestCount(guestCount + 1)}>+</button>
            </div>

            <input type="text" placeholder="Guest Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (touched.mobile) {
                  const valid = /^\d{10}$/.test(e.target.value);
                  setErrors((prev) => ({ ...prev, mobile: valid ? "" : "Mobile number must be exactly 10 digits." }));
                }
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, mobile: true }));
                const valid = /^\d{10}$/.test(mobile);
                setErrors((prev) => ({ ...prev, mobile: valid ? "" : "Mobile number must be exactly 10 digits." }));
              }}
              style={{ borderColor: errors.mobile ? "red" : undefined }}
            />
            {errors.mobile && touched.mobile && (
              <div style={{ color: "red", fontSize: "13px", marginTop: "-10px" }}>
                &#9888; {errors.mobile}
              </div>
            )}

            <input
              type="email"
              placeholder="Email Address (optional)"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  const valid = /^\S+@\S+\.\S+$/.test(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    email: valid || !e.target.value ? "" : "Please enter a valid email address.",
                  }));
                }
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, email: true }));
                const valid = /^\S+@\S+\.\S+$/.test(email);
                setErrors((prev) => ({
                  ...prev,
                  email: valid || !email ? "" : "Please enter a valid email address.",
                }));
              }}
              style={{ borderColor: errors.email ? "red" : undefined }}
            />
            {errors.email && touched.email && (
              <div style={{ color: "red", fontSize: "13px", marginTop: "-10px" }}>
                &#9888; {errors.email}
              </div>
            )}

            <h4>Payment Method</h4>
            <select value={payment} onChange={(e) => setPayment(e.target.value)}>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>

            <p><b>Total Amount :</b> ₹{getTotalAmount()}</p>

            <button
              className="confirm-btn"
              onClick={handleBooking}
              disabled={!guestName || !mobile || !!errors.mobile || !!errors.email || !selectedTime || !date}
            >
              Make Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
