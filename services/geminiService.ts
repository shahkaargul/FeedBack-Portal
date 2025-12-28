import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const polishFeedback = async (roughText: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const prompt = `
      You are a professional editor for an alumni association. 
      Rewrite the following feedback regarding a college reunion event to be more constructive, professional, and concise. 
      Do not change the sentiment or meaning, just improve the grammar and tone.
      
      Feedback: "${roughText}"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text?.trim() || roughText;
  } catch (error) {
    console.error("Gemini Polish Error:", error);
    return roughText; // Fallback to original text on error
  }
};