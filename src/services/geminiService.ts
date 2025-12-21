import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export const createChatSession = (systemInstruction: string): Chat => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
      topK: 40,
    },
  });
};

export const generateInsight = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insight:", error);
    throw error;
  }
};
