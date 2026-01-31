const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { runScreening } = require("../controllers/screeningController");

router.post("/analyze", auth, runScreening);

module.exports = router;
