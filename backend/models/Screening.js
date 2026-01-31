const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  answers: Object,
   riskLevel: {
    type: String,
    required: true
  },
    aiResponse: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Screening", screeningSchema);
