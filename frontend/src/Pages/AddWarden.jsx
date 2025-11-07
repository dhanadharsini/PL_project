import { useState } from "react";
import axios from "axios";
import "../App.css";

function AddWarden() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    wardenId: "",
    hostelName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ match backend schema
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        wardenID: formData.wardenId, // changed key
        hostel: formData.hostelName, // changed key
      };

      await axios.post("http://localhost:5000/api/admin/add-warden", data);

      alert("Warden added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        wardenId: "",
        hostelName: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding warden");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Warden</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Warden Name"
          value={formData.name}
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
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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
          name="wardenId"
          placeholder="Warden ID"
          value={formData.wardenId}
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
        <button type="submit">Add Warden</button>
      </form>
    </div>
  );
}

export default AddWarden;
