import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const polishCV = async (cvData) => {
  const rawText = `
Name: ${cvData.name}
Position: ${cvData.position}
City: ${cvData.city}
Skills: ${cvData.skills}
Experience: ${cvData.experience}
  `;

  try {
    const prompt = `
You are a professional resume editor.
Take the following raw text and transform it into a clear, structured resume:

${rawText}

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
    });

    console.log("AI response:", response.text);

    const rawResponse = response.text.trim();

    const cleaned = rawResponse
      .replace(/^```json\s*/, "") 
      .replace(/```$/, "");

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      parsed = {
        name: cvData.name,
        position: cvData.position,
        city: cvData.city,
        skills: cvData.skills,
        experience: cvData.experience,
      };
    }

    return parsed;
  } catch (err) {
    console.error("Error polishing resume:", err);
    return { raw: rawText };
  }
};
