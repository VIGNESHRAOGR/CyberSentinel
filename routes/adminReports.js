const express = require("express");
const router = express.Router();
const Report = require("../models/report");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET all reports for admin
router.get("/admin/reports", auth, admin, async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
});

// GET single report details
router.get("/admin/reports/:id", auth, admin, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report", error: error.message });
  }
});

// UPDATE report status
router.put("/admin/reports/:id/status", auth, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Under Review",
      "Investigating",
      "Resolved",
      "Rejected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
});

// UPDATE admin remark
router.put("/admin/reports/:id/remark", auth, admin, async (req, res) => {
  try {
    const { adminRemark } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { adminRemark },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Remark updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update remark", error: error.message });
  }
});

// DELETE report
router.delete("/admin/reports/:id", auth, admin, async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete report", error: error.message });
  }
});

module.exports = router;