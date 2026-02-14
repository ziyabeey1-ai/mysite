import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, this key should be proxied via backend to avoid exposure.
// The instructions strictly say to use process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEmailDraft = async (userName: string, projectType: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Anahtarı eksik olduğu için taslak oluşturulamadı.";
  }

  try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      Sen profesyonel bir dijital ajans sahibisin (Yusuf Ziya Terzioğlu).
      Müşteri adayı ismi: ${userName}
      İlgilendiği proje türü: ${projectType}
      
      Bu müşteriye göndermek için kısa, profesyonel, "Apple tarzı" sade ve etkileyici bir tanışma e-postası taslağı yaz.
      E-posta konusu ve içeriği olsun. Türkçe olsun.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Bir hata oluştu, lütfen tekrar deneyin.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Yapay zeka servisine şu an ulaşılamıyor.";
  }
};