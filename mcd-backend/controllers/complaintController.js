const Complaint = require("../models/complaintModel");

// GET all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({});
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST complaint
const submitComplaint = async (req, res) => {
  try {
    const { complaintId, name, phone, address, details } = req.body;

    const complaint = new Complaint({ complaintId, name, phone, address, details });
    await complaint.save();

    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitComplaint, getAllComplaints };
