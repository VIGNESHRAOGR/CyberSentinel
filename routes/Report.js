const express = require("express");
const router = express.Router();
const Report = require("../models/report");

// Submit a new report
router.post("/report", async (req, res) => {
  try {
    const { title, incidentType, severity, description } = req.body;

    const newReport = new Report({
      title,
      incidentType,
      severity,
      description
    });

    await newReport.save();

    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Failed to submit report" });
  }
});

module.exports = router;