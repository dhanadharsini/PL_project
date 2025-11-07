import { useState } from "react";
import axios from "axios";
import "../App.css";

function AddParent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    studentRegNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phone, // ✅ match backend key
      password: formData.password,
      studentRegisterNumber: formData.studentRegNo, // ✅ match backend key
    };

    await axios.post("http://localhost:5000/api/admin/add-parent", data);
    alert("Parent added successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      studentRegNo: "",
    });
  } catch (err) {
    console.error(err);
    alert("Error adding parent");
  }
};

  return (
    <div className="form-container">
      <h2>Add Parent</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Parent Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="studentRegNo" placeholder="Student Register Number" value={formData.studentRegNo} onChange={handleChange} required />
        <button type="submit">Add Parent</button>
      </form>
    </div>
  );
}

export default AddParent;
