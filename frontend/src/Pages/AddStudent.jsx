import { useState } from "react";
import axios from "axios";
import "../App.css";

function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    department: "",
    year: "",
    hostelName: "",
    roomNo: "",
    email: "",
    password: "",
    parentName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ match the backend’s expected field names
      const data = {
        name: formData.name,
        registerNumber: formData.regNo, // changed
        department: formData.department,
        year: formData.year,
        hostel: formData.hostelName, // changed
        roomNumber: formData.roomNo, // changed
        email: formData.email,
        password: formData.password,
        parentName: formData.parentName,
      };

      await axios.post("http://localhost:5000/api/admin/add-student", data);

      alert("Student added successfully!");
      setFormData({
        name: "",
        regNo: "",
        department: "",
        year: "",
        hostelName: "",
        roomNo: "",
        email: "",
        password: "",
        parentName: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding student");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="regNo"
          placeholder="Register Number"
          value={formData.regNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="hostelName"
          placeholder="Hostel Name"
          value={formData.hostelName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roomNo"
          placeholder="Room Number"
          value={formData.roomNo}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="parentName"
          placeholder="Parent's Name"
          value={formData.parentName}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
