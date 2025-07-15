const express = require('express');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const FILE_PATH = path.join(__dirname, '../data/staff.xlsx');

router.post('/', async (req, res) => {
  const { name, role, mobile, summary } = req.body;
  try {
    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(FILE_PATH)) {
      await workbook.xlsx.readFile(FILE_PATH);
    } else {
      workbook.addWorksheet('Staff');
    }

    const worksheet = workbook.getWorksheet('Staff') || workbook.addWorksheet('Staff');

    if (worksheet.rowCount === 0) {
      worksheet.addRow(['ID', 'Name', 'Role', 'Mobile', 'Summary']);
    }

    const id = 'S' + Date.now();
    worksheet.addRow([id, name, role, mobile, summary]);

    await workbook.xlsx.writeFile(FILE_PATH);
    res.status(200).json({ message: 'Staff data saved', id });
  } catch (err) {
    res.status(500).json({ error: 'Error saving staff data' });
  }
});

module.exports = router;
