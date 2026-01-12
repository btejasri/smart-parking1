import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import parkingBg from "../assets/parking-bg.jpg";

type Slot = {
  id: number;
  location: string;
  status: "available" | "booked";
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [slots, setSlots] = useState<Slot[]>([
    { id: 1, location: "A1", status: "available" },
    { id: 2, location: "A2", status: "booked" },
    { id: 3, location: "B1", status: "available" },
  ]);

  const [location, setLocation] = useState("");

  const addSlot = () => {
    if (!location.trim()) {
      alert("Enter slot location");
      return;
    }

    setSlots([
      ...slots,
      { id: slots.length + 1, location, status: "available" },
    ]);
    setLocation("");
  };

  const toggleStatus = (id: number) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              status: slot.status === "available" ? "booked" : "available",
            }
          : slot
      )
    );
  };

  const removeSlot = (id: number) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const total = slots.length;
  const booked = slots.filter((s) => s.status === "booked").length;
  const available = total - booked;

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <h2>🛠️ Admin Slot Dashboard</h2>
        <p style={{ color: "#555", marginBottom: "12px" }}>
          Manage parking slots efficiently
        </p>

        {/* 🔗 MILESTONE-5 BUTTON */}
        <button
          style={styles.reportBtn}
          onClick={() => navigate("/reports")}
        >
          📊 View Monthly Reports
        </button>

        {/* Statistics */}
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <h3>{total}</h3>
            <p>Total Slots</p>
          </div>
          <div style={styles.statBox}>
            <h3 style={{ color: "green" }}>{available}</h3>
            <p>Available</p>
          </div>
          <div style={styles.statBox}>
            <h3 style={{ color: "red" }}>{booked}</h3>
            <p>Booked</p>
          </div>
        </div>

        {/* Add Slot */}
        <div style={styles.addBox}>
          <input
            type="text"
            placeholder="Slot Location (e.g. C1)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />
          <button style={styles.addBtn} onClick={addSlot}>
            ➕ Add Slot
          </button>
        </div>

        {/* Slot List */}
        {slots.map((slot) => (
          <div key={slot.id} style={styles.slotCard}>
            <div>
              <strong>Slot {slot.location}</strong>
              <p
                style={{
                  color: slot.status === "available" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {slot.status.toUpperCase()}
              </p>
            </div>

            <div>
              <button
                style={styles.toggleBtn}
                onClick={() => toggleStatus(slot.id)}
              >
                Toggle
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => removeSlot(slot.id)}
              >
                ✖
              </button>
            </div>
          </div>
        ))}
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
      rgba(0,0,0,0.65),
      rgba(0,0,0,0.65)
    ), url(${parkingBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  glassCard: {
    width: "520px",
    padding: "32px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.92)",
    boxShadow: "0 25px 45px rgba(0,0,0,0.3)",
    textAlign: "center",
  },

  reportBtn: {
    marginBottom: "18px",
    padding: "10px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },

  statsGrid: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "22px",
  },

  statBox: {
    width: "30%",
    backgroundColor: "#f3f3f3",
    padding: "14px",
    borderRadius: "12px",
  },

  addBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "22px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  addBtn: {
    padding: "10px 16px",
    background: "linear-gradient(135deg,#43cea2,#185a9d)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  slotCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
  },

  toggleBtn: {
    marginRight: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminDashboard;

