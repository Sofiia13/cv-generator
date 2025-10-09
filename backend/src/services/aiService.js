import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const polishCV = async (rawResume) => {
  try {
    const prompt = `
      You are a professional resume editor.
      Take the following raw text and transform it into a clear, structured resume:

      ${rawResume}

      Respond in JSON format:
      {
        "name": "...",
        "position": "...",
        "city": "...",
        "skills": ["...", "..."],
        "experience": "..."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      contents: "Explain how AI works in a few words",
    });

    const polishedText = response.text;

    try {
      return JSON.parse(polishedText);
    } catch {
      return { raw: polishedText };
    }
  } catch (err) {
    console.error("Error polishing resume:", err);
    return { raw: rawResume };
  }

  console.log(response.text);
};
