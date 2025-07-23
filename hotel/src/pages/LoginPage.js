import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

const LoginPage = () => {
  const [loginType, setLoginType] = useState("user"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (loginType === "admin") {
      setEmail(ADMIN_EMAIL);
      setPassword(""); 
      setError("");
    } else {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [loginType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (loginType === "admin") {
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        alert("Admin login successful!");
        navigate("/admin");
      } else {
        setError("Invalid admin credentials");
      }
      setLoading(false);
      return;
    }


    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User login successful!");
        navigate("/");
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>

      <div className="login-toggle">
        <button
          className={loginType === "user" ? "active" : ""}
          onClick={() => setLoginType("user")}
        >
          User Login
        </button>
        <button
          className={loginType === "admin" ? "active" : ""}
          onClick={() => setLoginType("admin")}
        >
          Admin Login
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
          readOnly={loginType === "admin"} 
        />
        <input
          type="password"
          placeholder={
            loginType === "admin" ? "Enter admin password" : "Enter your password"
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
          autoComplete="off"
        />
        {error && <p className="login-error">{error}</p>}
        <div className="login-button-container">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {loginType === "user" && (
          <p className="login-text">
            Don't have an account?{" "}
            <span className="login-link" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
