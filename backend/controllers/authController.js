const { generateOTP } = require('../utils/otpGenerator');
const { sendWhatsAppMessage } = require('../utils/twilioClient');
const User = require('../models/user');

const otpStore = {}; // In production, replace with Redis or DB with expiry

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const otp = generateOTP();
    otpStore[phone] = otp;

    await sendWhatsAppMessage(phone, `Your OTP is: ${otp}`);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP are required' });
    }

    const storedOtp = otpStore[phone];
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is correct
    const user = await User.findOne({ phone });
    if (user) return res.json({ exists: true, user });

    return res.json({ exists: false });
  } catch (err) {
    console.error('Error verifying OTP:', err.message);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({ name, email, phone });
    await newUser.save();
    res.json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Failed to register user' });
  }
};
