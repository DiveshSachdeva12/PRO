const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const complaintRoutes = require("./routes/complaintRoutes");
const kiteRoutes = require('./routes/kiteRoutes');

dotenv.config();
const app = express();

// ✅ CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://municipalcorporation.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.options("*", cors());

// ✅ Log incoming headers (for debugging)
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  console.log("Headers:", req.headers.origin);
  next();
});

// ✅ JSON middleware
app.use(express.json());

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error", err));

// ✅ Routes
app.use("/api/complaints", complaintRoutes);
app.use("/api/kites", kiteRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
