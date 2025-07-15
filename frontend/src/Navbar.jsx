import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header>
      {/* Top Strip */}
      <div className="top-strip d-flex justify-content-between align-items-center px-3 py-1">
        <span >दिल्ली नगर निगम | Municipal Corporation of Delhi</span>
        <div className="d-flex align-items-center gap-3">
          <span>Screen Reader Access</span>
          <select className="form-select form-select-sm" style={{ width: 160 }}>
            <option>Select Language</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      {/* Header with Logo and Info */}
      <div className="main-header d-flex justify-content-between align-items-center px-4 py-2">
        <div className="d-flex align-items-center gap-3">
          <img src="/mcd.png" alt="MCD Logo" height="55" />
          <div>
            <h5 className="m-0 text-primary fw-bold">MCD</h5>
            <small className="d-block text-muted nigam">दिल्ली नगर निगम</small>
            <small className="text-secondary">पंकज लूथरा, निगम पार्षद, वार्ड 216</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
         
        </div>
      </div>

      {/* Navigation Links Centered */}
      <nav className="main-nav">
        <div className="nav-wrapper">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT US</Link>
          <Link to="/complaints" className="nav-link">Complaint</Link>
          {/* <Link to="/staff" className="nav-link">Employee</Link> */}
        
        </div>
      </nav>
    </header>
  );
}
