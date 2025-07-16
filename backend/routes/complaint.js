const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');

router.post('/', async (req, res) => {
  try {
    const { complaintId, name, phone, address, details } = req.body;

    const newComplaint = new Complaint({
      complaintId,
      name,
      phone,
      address,
      details
    });

    await newComplaint.save();
    res.status(200).json({ message: 'Complaint saved successfully' });
  } catch (err) {
    console.error('Error saving complaint:', err);
    res.status(500).json({ error: 'Failed to save complaint' });
  }
});

module.exports = router;
