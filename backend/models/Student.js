import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  hostel: { type: String, required: true },
  roomNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parentName: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
