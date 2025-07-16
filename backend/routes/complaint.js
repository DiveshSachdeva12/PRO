const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  details: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);
