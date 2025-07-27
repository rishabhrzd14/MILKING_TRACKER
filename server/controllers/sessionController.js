const MilkingSession = require("../models/MilkingSession");

exports.createSession = async (req, res) => {
  try {
    const session = new MilkingSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await MilkingSession.find().sort({ start_time: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
