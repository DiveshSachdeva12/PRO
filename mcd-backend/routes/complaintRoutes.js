const express = require("express");
const router = express.Router();
const { submitComplaint, getAllComplaints } = require("../controllers/complaintController");

// POST: /api/complaints
router.post("/", submitComplaint);

// GET: /api/complaints/all
router.get("/all", getAllComplaints);

module.exports = router;
