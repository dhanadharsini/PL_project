import React ,{useState} from 'react';
import axios from 'axios';

function StudentDashboard() {
  const [showForm,setShowForm]=useState(false);
  const [formData,setFormData]=useState({
    name:"",
    rollNo:"",
    roomNo:"",
    department:"",
    year:"",
    hostelName:"",
    place:"",
    fromDate:"",
    toDate:"",
    reason:""
  });

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/api/outpass/send", formData);
    alert(response.data.message || "Outpass request sent successfully!");
  } catch (error) {
    console.error("Error submitting outpass:", error);
    if (error.response) {
      alert(error.response.data.message || "Failed to send outpass request.");
    } else {
      alert("Server not reachable. Please try again later.");
    }
  }
};


  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>
      {!showForm && (
        <button onClick={()=> setShowForm(true)} className="request-btn">Request Outpass</button>
      )}
      {showForm && (
        <form className="request-form" onSubmit={handleSubmit}>
          <h3>Outpass Request Form</h3>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
          <label>Roll No:</label>
          <input type="text" name="rollNo" placeholder="RollNo" value={formData.rollNo} onChange={handleChange} required/>
          <label>Department:</label>
          <select
          name="department"
          value={formData.department}
          onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="IT">Information Technology</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE"> Electronics and Communication</option>
            <option value="EEE"> Electrical and Electronics</option>
            <option value="EIE"> Electronics and Instrumentation</option>
            <option value="MECH">Mechanical </option>
            <option value="IBT"> Industrial Biotechnology</option>
            <option value="CIVIL">Civil</option>
          </select>
           <label>Hostel Name:</label>
           <select name="hostelName" value={formData.hostelName} onChange={handleChange} required>
            <option value="">Select Hostel Name</option>
            <option value="manimutharu">Manimutharu</option>
            <option value="amaravathi">Amaravathi</option>
            <option value="noyyal">Noyyal</option>
            <option value="kothavari">Kothavari</option>
           </select>
          <label>Year:</label>
          <input type="text" name="year" value={formData.year} onChange={handleChange} required/>
          <label>Room No:</label>
          <input type="text" name="roomNo" placeholder="RoomNo" value={formData.roomNo} onChange={handleChange} required/>
          <label>Place of visit:</label>
          <input type="text" name="place" placeholder="Place of Visit" value={formData.place} onChange={handleChange} required/>
          <label>From Date:</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required/>
          <label>To Date:</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required/>
          <label>Reason:</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} rows="3" required></textarea>
          <div className="form-buttons">
            <button type="submit "className="btn">Submit</button>
            <button type="button" className="btn cancel" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default StudentDashboard