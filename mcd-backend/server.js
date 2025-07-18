// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mcdproject.vercel.app'  
  ],
  credentials: true
}));

app.use(express.json());

// Require routes AFTER app is defined
const complaintRoutes = require("./routes/complaintRoutes");
app.use("/api", complaintRoutes);
const kiteRoutes = require('./routes/kiteRoutes');
app.use('/api', kiteRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
