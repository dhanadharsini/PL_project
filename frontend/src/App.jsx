import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import ParentDashboard from "./Pages/ParentDashboard";
import ParentLogin from "./Pages/ParentLogin";
import WardenDashboard from "./Pages/WardenDashboard";
import WardenLogin from "./Pages/WardenLogin";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentLogin from "./Pages/StudentLogin";
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import ForgotPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import AddStudent from "./Pages/AddStudent";
import AddWarden from "./Pages/AddWarden";
import AddParent from "./Pages/AddParent";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/parent-login" element={<ParentLogin />} />
        <Route path="/warden-dashboard" element={<WardenDashboard />} />
        <Route path="/warden-login" element={<WardenLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-warden" element={<AddWarden />} />
        <Route path="/add-parent" element={<AddParent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
