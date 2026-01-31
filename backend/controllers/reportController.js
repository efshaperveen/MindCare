const Mood = require("../models/Mood");
const Screening = require("../models/Screening");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateReport = async (req, res) => {
  try {
    // 1️⃣ Get last 7 mood entries
    const moods = await Mood.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(7);

    // 2️⃣ Get latest screening
    const screening = await Screening.findOne({ userId: req.userId })
      .sort({ createdAt: -1 });

    if (!screening) {
      return res.status(400).json({
        message: "No screening data found"
      });
    }

    // 3️⃣ Prepare data for AI
    const moodSummary = moods.map(m => ({
      mood: m.mood,
      note: m.note,
      date: m.date
    }));

const prompt = `
You are a mental health assistant.

Analyze the user's mental health and RETURN ONLY valid JSON in this format:

{
  "summary": "overall mental health summary",
  "moodPatterns": "positive / negative / mixed mood pattern",
  "riskLevel": "Low | Medium | High",
  "selfCareSuggestions": [
    "tip 1",
    "tip 2",
    "tip 3"
  ],
  "seekHelp": "when professional help should be considered"
}

User Screening Result:
${JSON.stringify(screening.aiResponse)}

User Mood History (Last 7 days):
${JSON.stringify(moodSummary)}

IMPORTANT:
- Output ONLY valid JSON
- No extra text
- Not a medical diagnosis
`;


    // 4️⃣ Gemini AI call
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
   const result = await model.generateContent(prompt);
const aiText = result.response.text();

   // 6️⃣ SAFE JSON parsing (🔥 MOST IMPORTANT PART)
    let parsedReport;
    try {
      const cleanedText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsedReport = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Gemini raw response:", aiText);
      return res.status(500).json({
        message: "AI returned invalid JSON"
      });
    }

     // 7️⃣ Safety fallback (hackathon-safe)
    parsedReport.riskLevel = parsedReport.riskLevel || "Low";
    parsedReport.selfCareSuggestions =
      parsedReport.selfCareSuggestions || [];

    // 8️⃣ Send final report
    res.json(parsedReport);



  } catch (error) {
    res.status(500).json({
      message: "Failed to generate report",
      error: error.message
    });
  }
};
