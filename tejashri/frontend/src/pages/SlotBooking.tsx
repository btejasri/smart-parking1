import React, { useState, useEffect } from "react";

type Slot = {
  id: number;
  status: "available" | "booked";
};

const RATE_PER_HOUR = 20; // ₹20 per hour

const SlotBooking: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([
    { id: 1, status: "available" },
    { id: 2, status: "booked" },
    { id: 3, status: "available" },
    { id: 4, status: "available" },
  ]);

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [vehicleNo, setVehicleNo] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /* ⏱️ Timer logic */
  useEffect(() => {
    let timer: number | undefined;

    if (isRunning) {
      timer = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const startParking = () => {
    if (!selectedSlot || !vehicleNo) {
      alert("Please select a slot and enter vehicle number");
      return;
    }

    setElapsedSeconds(0);
    setIsRunning(true);

    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === selectedSlot ? { ...slot, status: "booked" } : slot
      )
    );
  };

  const stopParking = () => {
    setIsRunning(false);

    const hours = Math.max(1, Math.ceil(elapsedSeconds / 3600));
    const amount = hours * RATE_PER_HOUR;

    alert(
      `Parking Ended\nDuration: ${hours} hour(s)\nAmount: ₹${amount}`
    );

    alert("Payment successfully complete");

    setSelectedSlot(null);
    setVehicleNo("");
    setElapsedSeconds(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🚗 Parking Slots</h2>

        {/* Slot Grid */}
        <div style={styles.grid}>
          {slots.map((slot) => (
            <div
              key={slot.id}
              style={{
                ...styles.slot,
                backgroundColor:
                  slot.status === "available" ? "#4CAF50" : "#f44336",
                border:
                  selectedSlot === slot.id ? "3px solid black" : "none",
              }}
              onClick={() =>
                slot.status === "available" && setSelectedSlot(slot.id)
              }
            >
              Slot {slot.id}
            </div>
          ))}
        </div>

        {/* Vehicle Input */}
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
          style={styles.input}
        />

        {/* Timer & Payment */}
        {!isRunning ? (
          <button style={styles.startBtn} onClick={startParking}>
            ▶ Start Parking
          </button>
        ) : (
          <>
            <p style={{ margin: "12px 0", fontWeight: "bold" }}>
              ⏱️ Time: {Math.floor(elapsedSeconds / 60)} min{" "}
              {elapsedSeconds % 60} sec
            </p>

            <button style={styles.stopBtn} onClick={stopParking}>
              ⏹ Stop & Pay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/* 🎨 CREATIVE UI STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(120deg, #84fab0, #8fd3f4)",
  },

  card: {
    width: "420px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },

  slot: {
    padding: "22px",
    color: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  startBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },

  stopBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SlotBooking;
