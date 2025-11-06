import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="student-dashboard">
      <h1>Welcome, Admin!</h1>
      <button onClick={() => navigate("/add-student")}>Add Student</button>
      <button onClick={() => navigate("/add-warden")}>Add Warden</button>
      <button onClick={() => navigate("/add-parent")}>Add Parent</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
