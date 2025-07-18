// models/complaint.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);
