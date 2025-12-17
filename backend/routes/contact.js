const express = require("express");
const router = express.Router();
const { appendToSheet } = require("../services/googleSheets");

router.post("/", async (req, res) => {
  // Destructure safely
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await appendToSheet([name, email, message, new Date().toLocaleString()]);
    res.json({ success: true });
  } catch (error) {
    console.error("Google Sheets Error:", error.message);
    res.status(500).json({ error: "Failed to save to Google Sheets" });
  }
});

module.exports = router;
