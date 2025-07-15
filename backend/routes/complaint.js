const express = require('express');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const DATA_DIR = path.join(__dirname, '../data');
const FILE_PATH = path.join(DATA_DIR, 'complaints.xlsx');

router.post('/', async (req, res) => {
  const { complaintId, name, phone, address, details } = req.body;

  // Validate
  if (!complaintId || !name || !phone || !address || !details) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // ✅ Ensure the folder exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();

    // If file exists, load it
    if (fs.existsSync(FILE_PATH)) {
      await workbook.xlsx.readFile(FILE_PATH);
    }

    let worksheet = workbook.getWorksheet('Complaints');
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Complaints');
    }

    if (worksheet.actualRowCount === 0) {
      worksheet.addRow(['Complaint ID', 'Name', 'Phone', 'Address', 'Details']);
    }

    worksheet.addRow([complaintId, name, phone, address, details]);

    await workbook.xlsx.writeFile(FILE_PATH);

    res.status(200).json({ message: 'Complaint saved successfully', id: complaintId });
  } catch (err) {
    console.error('Error writing to Excel:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
