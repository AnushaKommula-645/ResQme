const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendOTP } = require('../services/twilio');
const crypto = require('crypto');

// Signup Step 1: send OTP
router.post('/signup/send-otp', async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP // 6-digit OTP

    const result = await sendOTP(phone, otp);
    if (result) {
        // Save OTP temporarily (in production use Redis or DB with TTL)
        global.otpStore = global.otpStore || {};
        global.otpStore[phone] = otp;
        res.json({ success: true, message: 'OTP sent' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

// Signup Step 2: verify OTP and save user
router.post('/signup/verify', async (req, res) => {
    const { name, email, password, phone, emergencyNumbers, otp } = req.body;

    if (!global.otpStore || global.otpStore[phone] != otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    try {
        const user = new User({ name, email, password, phone, emergencyNumbers });
        await user.save();
        delete global.otpStore[phone];
        res.json({ success: true, message: 'User created' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;
