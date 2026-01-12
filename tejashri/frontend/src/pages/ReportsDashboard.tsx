import React, { useState } from "react";

type Report = {
  date: string;
  slotId: string;
  duration: number; // hours
  userType: "user" | "admin";
};

const ReportsDashboard: React.FC = () => {
  const [reports] = useState<Report[]>([
    { date: "2026-01-01", slotId: "A1", duration: 2, userType: "user" },
    { date: "2026-01-02", slotId: "A2", duration: 3, userType: "admin" },
    { date: "2026-01-03", slotId: "B1", duration: 1.5, userType: "user" },
    { date: "2026-01-04", slotId: "B2", duration: 4, userType: "user" },
  ]);

  const totalBookings = reports.length;
  const avgDuration =
    reports.reduce((sum, r) => sum + r.duration, 0) / reports.length;

  const peakHours = "10 AM – 1 PM";

  /* CSV EXPORT */
  const exportCSV = () => {
    const header = "Date,Slot ID,Duration (hrs),User Type\n";
    const rows = reports
      .map(
        (r) => `${r.date},${r.slotId},${r.duration},${r.userType}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "parking-report.csv";
    a.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Monthly Usage Reports</h2>

      {/* STAT CARDS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>{totalBookings}</h3>
          <p>Total Bookings</p>
        </div>

        <div style={styles.statCard}>
          <h3>{avgDuration.toFixed(1)} hrs</h3>
          <p>Avg Duration</p>
        </div>

        <div style={styles.statCard}>
          <h3>{peakHours}</h3>
          <p>Peak Hours</p>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.table}>
        <div style={styles.rowHeader}>
          <span>Date</span>
          <span>Slot</span>
          <span>Duration</span>
          <span>User</span>
        </div>

        {reports.map((r, i) => (
          <div key={i} style={styles.row}>
            <span>{r.date}</span>
            <span>{r.slotId}</span>
            <span>{r.duration} hrs</span>
            <span>{r.userType}</span>
          </div>
        ))}
      </div>

      {/* EXPORT */}
      <button style={styles.exportBtn} onClick={exportCSV}>
        ⬇️ Export CSV
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(120deg, #141E30, #243B55)",
    color: "#fff",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },

  statsGrid: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
  },

  statCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "14px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },

  table: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "15px",
  },

  rowHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
  },

  exportBtn: {
    marginTop: "25px",
    padding: "14px",
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#43cea2,#185a9d)",
    color: "#fff",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ReportsDashboard;
