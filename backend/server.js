const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Import routes
const complaintRoutes = require('./routes/complaint');

// ✅ Use routes
app.use('/api/complaints', complaintRoutes);

// ✅ Default root route
app.get('/', (req, res) => {
  res.send('✅ MCD Backend is running!');
});

// ✅ Connect to MongoDB and Start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
