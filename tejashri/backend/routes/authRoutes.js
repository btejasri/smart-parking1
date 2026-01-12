import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { vehicleNumber, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      vehicleNumber,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { vehicleNumber, password } = req.body;

    const user = await User.findOne({ vehicleNumber });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;



