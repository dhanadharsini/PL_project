import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  wardenId: { type: String, required: true, unique: true },
  hostel: { type: String, required: true }
});

const Warden = mongoose.model("Warden", wardenSchema);
export default Warden;
