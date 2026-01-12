import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>👤 User Dashboard</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Book and manage your parking slots easily
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/slots")}
        >
          🚗 Book Parking Slot
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/")}
        >
          🔒 Logout
        </button>
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
    background: "linear-gradient(120deg, #89f7fe, #66a6ff)",
  },

  card: {
    width: "380px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#eee",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default UserDashboard;
