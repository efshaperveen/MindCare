const Mood = require("../models/Mood");

exports.addMood = async (req, res) => {
  const { mood, note } = req.body;

  const moodEntry = await Mood.create({
    userId: req.userId,
    mood,
    note
  });

  res.status(201).json({
    message: "Mood saved successfully",
    moodEntry
  });
};

exports.getMoodHistory = async (req, res) => {
  const moods = await Mood.find({ userId: req.userId }).sort({ date: -1 });

  res.json(moods);
};
