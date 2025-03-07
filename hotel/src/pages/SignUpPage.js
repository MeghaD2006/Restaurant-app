import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    alert("SignUp Succesfully");
    navigate("/");
  };
  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
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
          onChange={(e) => setPassword(e.targetValue)}
          style={styles.input}
          required
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            SignUp
          </button>
        </div>

        <p style={styles.text}>
          You already have an account{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            login
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
    padding: "5px",
    backgroundColor: "red",
    color: "White",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  buttonContainer: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
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
export default SignUpPage;
