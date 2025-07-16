const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: String,
  name: String,
  phone: String,
  address: String,
  details: String
});

module.exports = mongoose.model('Complaint', complaintSchema);
