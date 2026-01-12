import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "USER"
  }
});

export default mongoose.model("User", userSchema);
