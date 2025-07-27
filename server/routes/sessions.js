const express = require("express");
const router = express.Router();
const MilkingSession = require("../models/MilkingSession");

router.post("/", async (req, res) => {
  try {
    const { start_time, end_time, duration, milk_quantity } = req.body;

    if (!start_time || !end_time || !duration || !milk_quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const session = new MilkingSession({
      start_time,
      end_time,
      duration,
      milk_quantity,
    });

    await session.save();
    res.status(201).json(session);
  } catch (err) {
    console.error("POST /sessions error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const sessions = await MilkingSession.find().sort({ created_at: -1 });
    res.json(sessions);
  } catch (err) {
    console.error("GET /sessions error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
