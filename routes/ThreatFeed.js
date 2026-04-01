const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "cybersecurity OR malware OR phishing OR ransomware",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Threat feed error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch threat feed",
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;