const mongoose = require("mongoose");
const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  mood: {
    type: String,
    enum: ["happy", "calm", "neutral", "sad", "anxious"],
    required: true
  },
  note: String
}, { timestamps: true });

module.exports = mongoose.model("Mood", moodSchema);
