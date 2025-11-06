import { Link } from "react-router-dom";
import '../App.css'
import React from 'react'

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Hostel Outpass</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/student-login">Student Login</Link></li>
        <li><Link to="/parent-login">Parent Login</Link></li>
        <li><Link to="/warden-login">Warden Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar