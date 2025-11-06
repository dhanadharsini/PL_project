import {Link} from "react-router-dom";
import '../App.css';
import React from 'react'

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Hostel Outpass System</h1>
      <p>Parents can request permission for students, and wardens can approve or reject requests.</p>
      <div className="buttons">
        <Link to="/admin-login"><button>Admin Login</button></Link>
        <Link to="/student-login"><button>Student Login</button></Link>
         <Link to="/parent-login"><button>Parent Login</button></Link>
         <Link to="/warden-login"><button>Warden Login</button></Link>

      </div>
    </div>
  )
}

export default Home
