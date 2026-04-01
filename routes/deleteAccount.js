const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/delete-account", async (req, res) => {
  try {
    const { username } = req.body;

    await User.findOneAndDelete({ username });

    return res.json({ message: "Account deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;