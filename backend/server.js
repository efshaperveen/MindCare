const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/screening", require("./routes/screeningRoutes"));
app.use("/api/mood", require("./routes/moodRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));

app.get("/", (req, res) => {
  res.send("API is working!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
