import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

function WardenLogin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/warden/login", form);
      setMessage(res.data.message);
      localStorage.setItem("wardenToken", res.data.token);
      navigate("/warden-dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="parent-login-container">
      <div className="parent-card">
        <h2>Warden Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <div className="toggle-text">
          <p>
            Forgot password?{" "}
            <Link to="/forgot-password" style={{ color: "blue" }}>
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default WardenLogin;
