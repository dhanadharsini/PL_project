import mongoose from 'mongoose';

const outpassRequestSchema = new mongoose.Schema({
  studentName: String,
  regNo: String,
  roomNo: String,
  department: String,
  hostelName: String,
  fromDate: String,
  toDate: String,
  reason: String,
  parentEmail: String,
  
});

const OutpassRequest = mongoose.model('OutpassRequest', outpassRequestSchema);
export default OutpassRequest;
