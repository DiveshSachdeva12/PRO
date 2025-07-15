import React, { useState } from 'react';
import axios from 'axios';

export default function ComplaintForm() {
  // Function to generate unique Complaint ID
  const generateId = () => 'C' + Date.now();

  const [form, setForm] = useState({
    complaintId: generateId(),
    name: '',
    phone: '',
    address: '',
    details: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'name') {
      updatedValue = value.toUpperCase(); // auto-uppercase name
    }

    if (name === 'phone') {
      updatedValue = value.replace(/\D/g, ''); // digits only
    }

    setForm((prev) => ({ ...prev, [name]: updatedValue }));
    validateField(name, updatedValue);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let message = '';

    if (!value.trim()) {
      message = 'This field is required';
    }

    if (name === 'phone' && value.trim()) {
      if (value.length !== 10) {
        message = 'Phone must be 10 digits';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // Validate all fields and submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'complaintId') return; // skip ID field
      if (!value.trim()) newErrors[key] = 'This field is required';
      if (key === 'phone' && value.length !== 10) newErrors[key] = 'Phone must be 10 digits';
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post('/api/complaints', form);
      setSubmitted(true);
      setForm({
        complaintId: generateId(),
        name: '',
        phone: '',
        address: '',
        details: ''
      });
      setErrors({});
    } catch (err) {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Submit a Complaint</h2>

      {submitted && (
        <div className="alert alert-success">Complaint submitted successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
        {/* Complaint ID (disabled) */}
        <div className="col-md-6">
          <label className="form-label">Complaint ID</label>
          <input
            type="text"
            className="form-control"
            value={form.complaintId}
            disabled
            readOnly
          />
        </div>

        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            required
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Address */}
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        {/* Complaint Details */}
        <div className="col-12">
          <label className="form-label">Complaint Details</label>
          <textarea
            className={`form-control ${errors.details ? 'is-invalid' : ''}`}
            name="details"
            rows="4"
            value={form.details}
            onChange={handleChange}
            required
          ></textarea>
          {errors.details && <div className="invalid-feedback">{errors.details}</div>}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Submit Complaint</button>
        </div>
      </form>
    </div>
  );
}
