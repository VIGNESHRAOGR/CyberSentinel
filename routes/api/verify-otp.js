const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const twilio = require("twilio");

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ message: "Phone number and OTP are required" });
    }

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code: code
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({
        username: `user_${Date.now()}`,
        phone,
        password: "otp_user"
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "OTP verified successfully",
      token,
      username: user.username
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;