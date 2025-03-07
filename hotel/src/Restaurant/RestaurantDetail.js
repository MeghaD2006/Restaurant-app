import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
const RestaurantDetails = () => {
  const { id } = useParams();
  const restaurants = [
    {
      id: 1,
      img: "https://media.istockphoto.com/id/160101544/photo/restaurant.jpg?s=1024x1024&w=is&k=20&c=FsXAsBec-MFGNjDUhYmEkZFrHDXyCl1U4HffVtlejUE=",
      name: "TasteTales",
      description:
        "Where every dish tells a delicious story! Immerse yourself in a world of flavors crafted to perfection.",
      location: "Dhanasekaran Street,Central Chennai",
      amount: "₹2000 for 2(approx)",
      openTime: "11.00 a.m to 4.00 p.m",
      rating: 4.7,
      offer: "20% off on first booking",
      phone: "9788245771",
    },
    {
      id: 2,
      img: "https://media.istockphoto.com/id/147021064/photo/restaurant.jpg?s=1024x1024&w=is&k=20&c=XcgLDsjrcyTAXFyTRIf9CI57xkhXCFHKwzndHDOtw8g=",
      name: "FoodieFiestal",
      description:
        "A grand celebration of taste, aroma, and culinary artistry! Indulge in a feast that excites every sense.",
      location: "Thiyagaraja nagar,Delhi",
      amount: "₹4500 for 2(approx)",
      openTime: "2.00 a.m to 9.00 p.m",
      rating: 4.2,
      offer: "Free dessert with meals above ₹3000",
      phone: "8778530327",
    },
    {
      id: 3,
      img: "https://media.istockphoto.com/id/468404672/photo/elegant-restaurant-interior.jpg?s=612x612&w=is&k=20&c=yg-ttiauna64DGCAjaJ-8n92nGwvrRkLB11IGwOMGgY=",
      name: "Golden Elm",
      description:
        "A fine dining haven of elegance and exquisite flavors! Experience gourmet perfection in a luxurious ambiance.",
      location: "kasi nagar,UttarPradesh",
      amount: "₹3500 for 2(approx)",
      openTime: "1.00 p.m to 8.00 p.m",
      rating: 4.0,
      offer: "10% off on first booking",
      phone: "9345989778",
    },
    {
      id: 4,
      img: "https://media.istockphoto.com/id/1341448834/photo/spectacular-interior-of-the-contemporary-restaurant-main-hall-with-the-wooden-tables-and.jpg?s=1024x1024&w=is&k=20&c=K5kiHBMGoQlZ2JVbwuCharfuaqG925Q_Ptv0aKTZjZs=",
      name: "Taste Heaven",
      description:
        "Your gateway to divine cuisine and exceptional hospitality! Relish an unforgettable dining experience.",
      location: "Periyakulam,Theni",
      amount: "₹7000 for 2(approx)",
      openTime: "8.00 a.m to 4.00 p.m",
      rating: 4.5,
      offer: "10% discount for ordering any food ",
      phone: "9363414203",
    },
    {
      id: 5,
      img: "https://media.istockphoto.com/id/909973210/photo/sofa-and-armchair-with-table-in-luxury-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=o-XD0Ginj1SYVqej1dvCi0yeWnBuc73haTHUzioovX4=",

      name: "Tasty world",
      description:
        " Where every dish tells a delicious story! Immerse yourself in a world of flavors crafted to perfection.",
      location: "Kufri,Shimla",
      amount: "₹3000 for 2(approx)",
      openTime: "9.00 a.m to 1.00 p.m",
      rating: 3.9,
      offer: "Free juice for ordering any food",
      phone: "9025475059",
    },
    {
      id: 6,
      img: "https://media.istockphoto.com/id/1412418540/photo/stylish-boho-vintage-dining-room-interior-with-poster-mock-up-round-table-with-rattan-chair.jpg?s=1024x1024&w=is&k=20&c=CHiU35wzQV2troSki2RNIAxP1Ls53TUxtWLefvC-xb8=",
      name: "Flavor and Fusion",
      description:
        "A perfect blend of global flavors and innovative cuisine! Discover an extraordinary symphony of taste and tradition.",
      location: "Historic victorial mahal,Kolkata",
      amount: "₹5000 for 2(approx)",
      openTime: "1.00 p.m to 4.00 p.m",
      rating: 3.8,
      offer: "Free dessert with meals",
      phone: "9360759698",
    },
    {
      id: 7,
      img: "https://media.istockphoto.com/id/1342117894/photo/modern-commercial-spaces-and-architecture.jpg?s=1024x1024&w=is&k=20&c=vgbnT0yGGNTkjjJmVzsNTykK6EU34oHP8wOr9wv0qgU=",
      name: "Saffron Bay",
      description:
        "Savor the finest coastal flavors and aromatic Indian spices while enjoying breathtaking sea views at Saffron Bay.",
      location: "120 Marine Drive,Maharastra",
      amount: "₹5000 for 2(approx)",
      openTime: "8.00 a.m to 4.00 p.m",
      rating: "4.1",
      offer: "10% discount for ordering any food",
      phone: "9788205081",
    },
    {
      id: 8,
      img: "https://media.istockphoto.com/id/846366720/photo/interior-of-cozy-restaurant-loft-style.jpg?s=1024x1024&w=is&k=20&c=bWOEzX_z-XzLpFtldTIvx2_OwWvKGbmw3lPcCaQekhw=",
      name: "Spice Street",
      description:
        "Dive into a vibrant feast of bold Indian street food flavors at Spice Street, where every bite is an adventure.",
      location: "58 Hennur Road,Bangalore",
      amount: "₹5000 for 2(approx)",
      openTime: "1.00 p.m to 4.00 p.m",
      rating: 3.9,
      offer: "Free dessert with meals",
      phone: "9585382818",
    },
  ];
  const menuImages = {
    1: {
      food: "https://marketplace.canva.com/EAFwRADHMsM/1/0/1035w/canva-orange-and-black-bold-geometric-restaurant-menu-AX4bhelWqNA.jpg",
    },
    2: {
      food: "https://img.freepik.com/free-psd/food-menu-restaurant-bifold-brochure-template_120329-1825.jpg",
    },
    3: {
      food: "https://i.pinimg.com/236x/77/3c/6d/773c6dcd8e6a16f10e5742dc2a40637b.jpg",
    },
    4: {
      food: "https://static.vecteezy.com/system/resources/thumbnails/005/751/304/small_2x/fast-food-menu-vector.jpg",
    },
    5: {
      food: "https://graphicdesigneye.com/images/menu-design-services.jpg",
    },

    6: {
      food: "https://img.pikbest.com/origin/06/31/22/126pIkbEsTUGy.jpg!w700wp",
    },
    7: {
      food: "https://4.imimg.com/data4/YP/NG/MY-9658758/food-mneu-card-designing-500x500.jpg",
    },
    8: {
      food: "https://content.jdmagicbox.com/rep/b2b/menu-card/menu-card-5.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
    },
  };
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [selectedTime, setSelectedTime] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [guestError, setGuestError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online payment");
  const [selectedOffer, setSelectedOffer] = useState("");
  
  
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  if (!restaurant) {
    return <div>Restaurant not found!</div>;
  }
  

  const handleTimeSlotSelect = (time) => {
    setSelectedTime(time);
  };
  const validateEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.includes("@") || !/\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailError("⚠ Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validateMobile = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    if (!/^\d{10}$/.test(value)) {
      setMobileError("⚠ Mobile number must be exactly 10 digits.");
    } else {
      setMobileError("");
    }
  };
  const timeSlots = {
    Breakfast: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM"],
    Lunch: ["12:00 PM", "12:30 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM"],
    Dinner: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"],
  };

  const calculateTotalAmount = () => {
    const baseAmount = parseInt(restaurant.amount.match(/\d+/)[0], 10);
    let total = Math.floor((baseAmount / 2) * guestCount);
    if (
      selectedOffer === "Flat 10% offer on online payment" &&
      paymentMethod === "Online Payment"
    ) {
      total = Math.floor(total * 0.9);
    }
    return total;
  };

  const handleReservation = () => {
    if (!guestName || !mobileNumber || !selectedTime || !selectedDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all details before reservation.",
      });
      return;
    }

    let message = `Reservation successfully made for ${guestName} on ${selectedDate} at ${selectedTime}!`;

    if (selectedOffer === "Free dessert with meals") {
      message += "\n🎉 You will receive a free dessert with your meal!";
    }

    Swal.fire({
      icon: "success",
      title: "Reservation Successful!",
      text: message,
      showCancelButton: paymentMethod === "Online Payment",
      confirmButtonText:
        paymentMethod === "Online Payment" ? "Proceed to Payment" : "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && paymentMethod === "Online Payment") {
        proceedToPayment();
      }
    });
  };

  const proceedToPayment = () => {
    Swal.fire({
      icon: "info",
      title: "Redirecting to Payment...",
      text: "Please complete your online payment.",
    });
  };
  return (
    <div style={styles.mainContainer}>
      <div style={styles.leftcontainer}>
        <h2>{restaurant.name}</h2>
        <img
          src={restaurant.img}
          alt={restaurant.name}
          style={styles.image}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <p style={styles.italictext}>
          <strong></strong>
          {restaurant.description}
        </p>
        <p>
          <strong>Location:</strong>
          {restaurant.location}
        </p>
        <p>
          <strong>Amount:</strong>
          {restaurant.amount}
        </p>
        <p>
          <strong>OpenTime:</strong>
          {restaurant.openTime}
        </p>
        <p>
          <strong>Rating:</strong>
          {restaurant.rating}
        </p>
        <p>
          <strong>Offer:</strong>
          {restaurant.offer}
        </p>
        <div style={styles.menu}>
          <h3>Menu</h3>
          <div style={styles.menuContainer}>
            <div style={styles.menuItem}>
              <img
                src={menuImages[restaurant.id]?.food}
                alt="Food Menu"
                style={styles.menuImage}
              />
              <p>Food menu</p>
            </div>
          </div>
        </div>
        <div style={styles.callContainer}>
          <h3>We're always here to help</h3>
          <div style={styles.callBox}>
            <div style={styles.phoneIcon}>
              <FaPhoneAlt />
            </div>
            <div>
              <p style={styles.callText}>Call the restaurant</p>
              <p style={styles.phoneNumber}>{restaurant.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.rightContainer}>
        <div style={styles.offerHeader}>Select an Offer or Deal</div>
        <h3>Select Offer</h3>
        <select
          value={selectedOffer}
          onChange={(e) => setSelectedOffer(e.target.value)}
          style={styles.input}
        >
          <option value="Flat 10% offer on online payment">
            Flat 10% offer on online payment
          </option>
          <option value="Free dessert with meals">
            Free dessert with meals
          </option>
        </select>

        <h3>Select Date</h3>
        <input
          type="date"
          style={styles.input}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <h3>Choose an Available Time Slot</h3>
        <div style={styles.tabs}>
          {Object.keys(timeSlots).map((meal) => (
            <button
              key={meal}
              onClick={() => setSelectedMeal(meal)}
              style={{
                ...styles.tab,
                borderBottom: selectedMeal === meal ? "3px red" : "none",
                fontWeight: selectedMeal === meal ? "bold" : "normal",
                color: selectedMeal === meal ? "red" : "black",
              }}
            >
              {meal}
            </button>
          ))}
        </div>
        <div style={styles.timeSlotContainer}>
          {timeSlots[selectedMeal].map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSlotSelect(time)}
              style={{
                ...styles.timeSlot,
                backgroundColor: selectedTime === time ? "red" : "#ddd",
                color: selectedTime === time ? "white" : "black",
              }}
            >
              {time}
            </button>
          ))}
        </div>
        {selectedTime && (
          <>
            <h3>Enter Guest Details</h3>
            <div style={styles.quantityControl}>
              <button
                onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span>{guestCount}</span>
              <button
                onClick={() => setGuestCount((prev) => Math.max(1, prev + 1))}
              >
                +
              </button>
            </div>

            {guestError && <div style={styles.errorMessage}>{guestError}</div>}

            <input
              type="text"
              placeholder="Guest Name"
              style={styles.input}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              style={styles.input}
              value={mobileNumber}
              onChange={validateMobile}
            />
            {mobileError && (
              <div style={styles.errorMessage}>{mobileError}</div>
            )}

            <input
              type="email"
              placeholder="Email Address (optional)"
              style={styles.input}
              value={email}
              onChange={validateEmail}
            />
            <h3>Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.input}
            >
              <option value="Cash">Cash</option>
              <option value="Online Payment">Online Payment</option>
            </select>
            <h3> Total Amount : ₹{calculateTotalAmount()}</h3>
            {emailError && <div style={styles.errorMessage}>{emailError}</div>}
            <button onClick={handleReservation} style={styles.continueButton}>
              Make Reservation
            </button>
          </>
        )}
      </div>
    </div>
  );
};
const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "2rem",
    fontFamily: "Arial,sans-serif",
  },
  italictext: {
    fontStyle: "italic",
  },

  leftcontainer: {
    padding: "1rem",
    width: "70%",
  },
  rightContainer: {
    marginTop: "4rem",
    width: "35%",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "left",
    backgroundColor: "#f8f8f8",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "2px solid #ccc",
    marginBottom: "1rem",
  },
  tab: {
    flex: "1",
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontsize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    transition: "0.3s",
  },
  timeSlotContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "10px",
  },
  timeSlot: {
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
  },
  quantityControl: {
    display: "flex",
    justifyContent: "center",
    border: "none",
    alignItems: "center",
    gap: "10px",
  },
  offerHeader: {
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  menu: {
    backgroundColor: "#f8f8f8",
    padding: "10px",
  },

  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    marginTop: "1rem",
    transition: "transform 0.3s ease-in-out",
  },
  imageHover: {
    transform: "scale(1.1)",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "-5px",
  },
  continueButton: {
    backgroundColor: "red",
    color: "white",
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  callContainer: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "1rem",
  },

  menuImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginLeft: "10px",
  },
  callBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "fff",
    padding: "10px",
    boxshadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  phoneIcon: {
    backgroundColor: "red",
    color: "#fff",
    padding: "10px",
    borderRadius: "50%",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  },
  callText: {
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: "16px",
  },
};
export default RestaurantDetails;
