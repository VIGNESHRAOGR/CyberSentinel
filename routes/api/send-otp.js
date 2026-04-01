const express = require("express");
const twilio = require("twilio");

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    console.log("ACCOUNT SID:", process.env.TWILIO_ACCOUNT_SID);
    console.log("VERIFY SID:", process.env.TWILIO_VERIFY_SERVICE_SID);

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: "sms"
      });

    res.json({ message: "OTP sent successfully", status: verification.status });
  } catch (err) {
    console.log("SEND OTP ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;