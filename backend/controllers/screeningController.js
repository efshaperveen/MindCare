const { GoogleGenerativeAI } = require("@google/generative-ai");
const Screening = require("../models/Screening");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.runScreening = async (req, res) => {
  try {
    const { answers } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a mental health assistant.

Analyze the user's answers and RETURN STRICT JSON in this format ONLY:

{
  "riskLevel": "Low | Medium | High",
  "explanation": "short explanation",
  "guidance": [
    "tip 1",
    "tip 2",
    "tip 3"
  ]
}

User Answers:
${JSON.stringify(answers)}

IMPORTANT:
- Output ONLY valid JSON
- No extra text
- Not a medical diagnosis
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = text.replace(/```json|```/g, "").trim();
    const aiData = JSON.parse(cleanedText);

    await Screening.create({
      userId: req.userId,
      answers,
      aiResponse: aiData,
      riskLevel: aiData.riskLevel
    });

    res.json(aiData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Screening analysis failed" });
  }
};

