const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addMood, getMoodHistory } = require("../controllers/moodController");

router.post("/add", auth, addMood);
router.get("/history", auth, getMoodHistory);

module.exports = router;
