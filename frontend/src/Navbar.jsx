import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  // Function to handle password-protected route
  const handleKiteDistributionClick = (e) => {
    e.preventDefault(); // prevent default link navigation
    const password = prompt("Enter admin password to access Kite Distribution:");

    if (password === "admin123") {
      navigate('/kite-distribution');
    } else {
      alert("Incorrect password. Access denied.");
    }
  };

  return (
    <header>
      {/* Top Strip */}
      <div className="top-strip d-flex justify-content-between align-items-center px-3 py-1">
        <span>दिल्ली नगर निगम | Municipal Corporation of Delhi</span>
        <div className="d-flex align-items-center gap-3">
          <span>Screen Reader Access</span>
          <select className="form-select form-select-sm" style={{ width: 160 }}>
            <option>Select Language</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <div className="main-header d-flex justify-content-between align-items-center px-4 py-2">
        <div className="d-flex align-items-center gap-3">
          <img src="/mcd.png" alt="MCD Logo" height="55" />
          <div>
            <h5 className="m-0 text-primary fw-bold">MCD</h5>
            <small className="d-block text-muted nigam">दिल्ली नगर निगम</small>
            <small className="text-secondary">पंकज लूथरा, निगम पार्षद, वार्ड 216</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3"></div>
      </div>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-wrapper">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT US</Link>
          <Link to="/complaints" className="nav-link">COMPLAINT</Link>

          {/* Locked Link */}
          <a href="/kite-distribution" className="nav-link" onClick={handleKiteDistributionClick}>
            KITE DISTRIBUTION 🔒
          </a>
        </div>
      </nav>
    </header>
  );
}
