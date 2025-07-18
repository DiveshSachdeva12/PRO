import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ComplaintForm from './components/ComplaintForm';
import StaffForm from './components/StaffForm';
import KiteDistribution from './components/KiteDistribution';


export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/complaints" element={<ComplaintForm />} />
          <Route path="/staff" element={<StaffForm />} />
          <Route path="/kite-distribution" element={<KiteDistribution />} />
        </Routes>
      </div>
    </>
  );
}
