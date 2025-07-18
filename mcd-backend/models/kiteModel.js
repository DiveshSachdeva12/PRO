const mongoose = require('mongoose');

const kiteSchema = new mongoose.Schema({
  aadhar: {
    type: String,
    required: true,
    unique: true,
    length: 12,
  },
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  address: {
    type: String,
    required: true,
    uppercase: true,
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model('Kite', kiteSchema);
