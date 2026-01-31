const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { generateReport } = require("../controllers/reportController");

router.get("/generate", auth, generateReport);

module.exports = router;
