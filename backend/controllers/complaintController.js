exports.createComplaint = async (req, res) => {
  try {
    console.log('Incoming Complaint Data:', req.body); // ✅ Log the data

    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: 'Complaint saved successfully', data: complaint });
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
