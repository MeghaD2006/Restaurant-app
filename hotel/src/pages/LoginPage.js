import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login Succesfully");
    navigate("/");
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </div>

        <p style={styles.text}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    AlignItems: "center",
  },
  heading: {
    margin: "0",
    paddingBottom: "10px",
    fontSize: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  input: {
    margin: "5px 0",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
  },
  button: {
    padding: "5px 20px",
    backgroundColor: "red",
    color: "White",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  text: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    color: "blue",
    cursor: "pointer",
  },
};
export default LoginPage;
