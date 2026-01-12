import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import loginBg from "../assets/login-bg.jpg";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // ✅ ALWAYS empty initially
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="ParkSmart Logo" style={styles.logo} />

        <h2>ParkSmart</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Smart • Secure • Simple Parking
        </p>

        {/* ✅ EMAIL (AUTOFILL DISABLED) */}
        <input
          type="email"
          name="parksmart-email"     // IMPORTANT
          placeholder="Email Address"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* ✅ PASSWORD (AUTOFILL DISABLED) */}
        <input
          type="password"
          name="parksmart-password"  // IMPORTANT
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          New user? <Link to="/register">Register here</Link>
        </p>

        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          Role Selection
        </p>

        <div style={styles.roleBox}>
          <button
            style={role === "user" ? styles.activeRole : styles.roleBtn}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            style={role === "admin" ? styles.activeRole : styles.roleBtn}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

/* 🎨 STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(
      rgba(0,0,0,0.6),
      rgba(0,0,0,0.6)
    ), url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  card: {
    width: "380px",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  logo: {
    width: "80px",
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  roleBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  roleBtn: {
    width: "48%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },

  activeRole: {
    width: "48%",
    padding: "8px",
    borderRadius: "6px",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Login;
