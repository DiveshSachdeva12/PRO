const Kite = require('../models/kiteModel');

exports.submitKiteForm = async (req, res) => {
  const { aadhar, name, address, quantity } = req.body;

  try {
    // Check if kite already given
    const existing = await Kite.findOne({ aadhar });

    if (existing) {
      return res.status(400).json({ message: "Kite already distributed to this Aadhar number." });
    }

    const newEntry = new Kite({
      aadhar,
      name: name.toUpperCase(),
      address: address.toUpperCase(),
      quantity: parseInt(quantity), // ensure it's a number
    });

    await newEntry.save();

    res.status(201).json({ message: "Kite successfully distributed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
