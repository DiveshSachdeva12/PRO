import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ComplaintForm from './components/ComplaintForm';
import StaffForm from './components/StaffForm';

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/complaints" element={<ComplaintForm />} />
          <Route path="/staff" element={<StaffForm />} />
        </Routes>
      </div>
    </>
  );
}
