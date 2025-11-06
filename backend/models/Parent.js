import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  studentRegNo: { type: String, required: true }, // link to student
  role: { type: String, default: "parent" },
});

export default mongoose.model("Parent", parentSchema);
