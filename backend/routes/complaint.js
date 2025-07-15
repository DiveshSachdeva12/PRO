const express = require('express');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const FILE_PATH = path.join(__dirname, '../data/complaints.xlsx');

router.post('/', async (req, res) => {
  const { complaintId, name, phone, address, details } = req.body;

  // Log to confirm incoming data
  console.log('Received data:', req.body);

  // Validate incoming fields
  if (!complaintId || !name || !phone || !address || !details) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const workbook = new ExcelJS.Workbook();

    // Load existing file if it exists
    if (fs.existsSync(FILE_PATH)) {
      await workbook.xlsx.readFile(FILE_PATH);
    }

    // Use existing or new worksheet
    let worksheet = workbook.getWorksheet('Complaints');
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Complaints');
    }

    // Add header row only if empty
    if (worksheet.actualRowCount === 0) {
      worksheet.addRow(['complaintId', 'Name', 'Phone', 'Address', 'Details']);
    }

    // ✅ Use complaintId from frontend ONLY
    console.log('Writing row:', [complaintId, name, phone, address, details]);
    worksheet.addRow([complaintId, name, phone, address, details]);

    // Save file
    await workbook.xlsx.writeFile(FILE_PATH);

    res.status(200).json({ message: 'Complaint saved successfully', id: complaintId });
  } catch (err) {
    console.error('Error writing to Excel:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;  

