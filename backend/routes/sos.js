// routes/sos.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendOTP } = require('../services/twilio'); // reuse sendOTP as SMS sender

// Send SOS
router.post('/', async (req, res) => {
  const { userId, location } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${location}`;

    // Send SOS to all emergency contacts
    for (let number of user.emergencyNumbers) {
      await sendOTP(
        number,
        `🚨 SOS Alert! ${user.name} needs help. Location: ${mapsLink}`
      );
    }

    res.json({ success: true, message: 'SOS sent to emergency numbers' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
