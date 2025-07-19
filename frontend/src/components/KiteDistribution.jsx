import React, { useState } from 'react';
import axios from 'axios';

const KiteDistribution = () => {
  const [form, setForm] = useState({
    aadhar: '',
    name: '',
    address: '',
    quantity: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'address') {
      setForm({ ...form, [name]: value.toUpperCase() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateAadhar = (aadhar) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAadhar(form.aadhar)) {
      setMessage('Aadhar number must be exactly 12 digits.');
      return;
    }

    try {
      const res = await axios.post(
        'https://municipalcorporation.onrender.com',
        form
      );
      setMessage(res.data.message);
      setForm({ aadhar: '', name: '', address: '', quantity: '' });
    } catch (err) {
      console.error('Error submitting form:', err.response || err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Kite Distribution Form</h3>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="aadhar"
          className="form-control mb-2"
          placeholder="Aadhar Card Number"
          value={form.aadhar}
          onChange={handleChange}
          maxLength="12"
          pattern="\d{12}"
          required
        />
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          className="form-control mb-2"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          className="form-control mb-2"
          placeholder="Quantity of Kites"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default KiteDistribution;
