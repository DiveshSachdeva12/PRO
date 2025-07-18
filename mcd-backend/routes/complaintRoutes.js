// routes/complaintRoutes.js
const express = require("express");
const router = express.Router();
const { submitComplaint } = require("../controllers/complaintController");

router.post("/complaints", submitComplaint);

module.exports = router;
