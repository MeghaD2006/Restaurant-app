import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Restaurant/Navbar";
import RestaurantDetail from "./Restaurant/RestaurantDetail";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookTablePage from "./Restaurant/BookTablePage";
import Footer from "./pages/Footer";
import HomePage from "./Restaurant/HomePage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/book-table/:city?" element={<BookTablePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
