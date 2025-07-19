import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [kites, setKites] = useState([]);
  const [search, setSearch] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('complaints');
  const correctPassword = 'admin123';

  const rowRefs = useRef({});
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/complaints/all`);
      setComplaints(res.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchKites = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/kites/all`);
      setKites(res.data);
    } catch (error) {
      console.error('Error fetching kites:', error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchComplaints();
      fetchKites();
    }
  }, [authenticated]);

  const filteredComplaints = complaints.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.complaintId.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search)
  );

  const filteredKites = kites.filter((item) =>
    item.kiteId?.toLowerCase().includes(search.toLowerCase()) ||
    item.owner?.toLowerCase().includes(search.toLowerCase())
  );

  const copyRowAsImage = async (id) => {
    const ref = rowRefs.current[id];
    if (ref) {
      const canvas = await html2canvas(ref);
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item])
          .then(() => alert('📸 Entry copied to clipboard!'))
          .catch(() => alert('❌ Failed to copy image.'));
      });
    }
  };

  const downloadExcel = () => {
    const dataToDownload = activeTab === 'complaints' ? complaints : kites;

    const wsData = dataToDownload.map((c) =>
      activeTab === 'complaints'
        ? {
            'Complaint ID': c.complaintId,
            Name: c.name,
            Phone: c.phone,
            Address: c.address,
            Details: c.details,
            Date: new Date(c.createdAt).toLocaleString(),
          }
        : {
            'Kite ID': c.kiteId,
            Owner: c.owner,
            Color: c.color,
            Size: c.size,
            Date: new Date(c.createdAt).toLocaleString(),
          }
    );

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeTab === 'complaints' ? 'Complaints' : 'Kites');
    XLSX.writeFile(wb, `${activeTab}_data.xlsx`);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/');
  };

  if (!authenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-90 bg-light">
        <div className="border p-5 bg-white shadow rounded" style={{ width: '100%', maxWidth: '400px', height: '350px' }}>
          <h3 className="mb-4 text-center mt-5">🔐 Admin Login</h3>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              if (password === correctPassword) {
                setAuthenticated(true);
              } else {
                alert('Incorrect password');
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">{activeTab === 'complaints' ? 'All Complaints' : 'All Kites'}</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => setActiveTab('complaints')}>
            📋 Complaints All Details
          </button>
          <button className="btn btn-outline-info me-2" onClick={() => setActiveTab('kites')}>
            🪁 Kites All Details
          </button>
          <button className="btn btn-success me-2" onClick={downloadExcel}>
            ⬇️ Download Excel
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder={`Search by ${activeTab === 'complaints' ? 'name, phone or complaint ID' : 'kite ID or owner'}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            {activeTab === 'complaints' ? (
              <tr>
                <th>Complaint ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Details</th>
                <th>Date</th>
                <th>Copy</th>
              </tr>
            ) : (
              <tr>
                <th>Kite ID</th>
                <th>Owner</th>
                <th>Color</th>
                <th>Size</th>
                <th>Date</th>
                <th>Copy</th>
              </tr>
            )}
          </thead>
          <tbody>
            {(activeTab === 'complaints' ? filteredComplaints : filteredKites).map((c) => (
              <tr key={c._id} ref={(el) => rowRefs.current[c._id] = el}>
                {activeTab === 'complaints' ? (
                  <>
                    <td>{c.complaintId}</td>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>{c.address}</td>
                    <td>{c.details}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                  </>
                ) : (
                  <>
                    <td>{c.kiteId}</td>
                    <td>{c.owner}</td>
                    <td>{c.color}</td>
                    <td>{c.size}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                  </>
                )}
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => copyRowAsImage(c._id)}
                  >
                    📋 Copy
                  </button>
                </td>
              </tr>
            ))}
            {(activeTab === 'complaints' ? filteredComplaints : filteredKites).length === 0 && (
              <tr>
                <td colSpan={activeTab === 'complaints' ? 7 : 6} className="text-center text-muted">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
