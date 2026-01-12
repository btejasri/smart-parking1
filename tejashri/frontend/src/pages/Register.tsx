import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [vehicleNo, setVehicleNo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!vehicleNo || !password) {
      alert("All fields required");
      return;
    }

    console.log("Register Details:");
    console.log("Vehicle No:", vehicleNo);
    console.log("Password:", password);

    alert("Registration data captured (Milestone-1)");
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Vehicle Registration Number"
        value={vehicleNo}
        onChange={(e) => setVehicleNo(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleRegister}>
        Register
      </button>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "320px",
    margin: "100px auto",
    padding: "25px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
  },
  button: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
  },
};

export default Register;




