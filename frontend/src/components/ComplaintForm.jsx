  import React, { useState } from 'react';
  import axios from 'axios';

  export default function ComplaintForm() {
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      let updatedValue = value;

      if (name === 'name') {
        updatedValue = value.toUpperCase();
      }

      if (name === 'phone') {
        updatedValue = value.replace(/\D/g, '');
      }

      setForm((prev) => ({ ...prev, [name]: updatedValue }));
      validateField(name, updatedValue);
    };

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

    const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = {};
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'complaintId') return;
        if (!value.trim()) newErrors[key] = 'This field is required';
        if (key === 'phone' && value.length !== 10) newErrors[key] = 'Phone must be 10 digits';
      });

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        await axios.post(`${baseURL}/api/complaints`, form); // ✅ Uses deployed backend

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
        console.error(err);
      }
    };

    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-primary">SUBMIT A COMPLAINT</h2>

        {submitted && (
          <div className="alert alert-success">Complaint submitted successfully!</div>
        )}

        <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
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

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit Complaint</button>
          </div>
        </form>
      </div>
    );
  }
