import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  wardenId: { type: String, required: true, unique: true },
  hostelName: { type: String, required: true },
  role: { type: String, default: "warden" }, // for role-based access
});

export default mongoose.model("Warden", wardenSchema);
