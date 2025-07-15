import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffForm.css';

export default function StaffForm() {
  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    role: '',
    mobile: '',
    summary: ''
  });
  const [errors, setErrors] = useState({});

  // Generate unique employee ID on mount
  useEffect(() => {
    const id = 'EMP' + Date.now();
    setForm(prev => ({ ...prev, employeeId: id }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.role.trim()) newErrors.role = 'Role is required';
    if (!/^[6-9]\d{9}$/.test(form.mobile)) newErrors.mobile = 'Enter valid 10-digit mobile number';
    if (!form.summary.trim()) newErrors.summary = 'Summary is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'name' ? value.toUpperCase() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('/api/staff', form);
      alert('Staff entry submitted!');
      setForm({
        employeeId: 'EMP' + Date.now(),
        name: '',
        role: '',
        mobile: '',
        summary: ''
      });
      setErrors({});
    } catch (err) {
      alert('Error submitting staff data');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Staff Entry Form</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" value={form.employeeId} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input
            type="text"
            name="role"
            value={form.role}
            className={`form-control ${errors.role ? 'is-invalid' : ''}`}
            onChange={handleChange}
            placeholder="Enter role"
          />
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Work Summary</label>
          <textarea
            name="summary"
            value={form.summary}
            className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
            rows="3"
            onChange={handleChange}
            placeholder="Brief summary of the work done"
          ></textarea>
          {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">Submit Entry</button>
        </div>
      </form>
    </div>
  );
}
