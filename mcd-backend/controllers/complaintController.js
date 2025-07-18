// controllers/complaintController.js
const Complaint = require("../models/complaintModel");

const submitComplaint = async (req, res) => {
  try {
    const { complaintId, name, phone, address, details } = req.body;

    if (!complaintId || !name || !phone || !address || !details) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newComplaint = new Complaint({ complaintId, name, phone, address, details });
    await newComplaint.save();

    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit complaint" });
  }
};

module.exports = { submitComplaint };
