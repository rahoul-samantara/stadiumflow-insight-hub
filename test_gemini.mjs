import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config({ path: "C:/Users/User/OneDrive/Documents/StudioFlow AI/.env" });

async function testGemini() {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ VITE_GEMINI_API_KEY is not set in .env");
    process.exit(1);
  }

  try {
    console.log("Testing connection with Gemini API...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hello, respond with 'Connection successful!'");
    console.log("✅ Response received:", result.response.text());
  } catch (error) {
    console.error("❌ Gemini API connection failed:", error);
  }
}

testGemini();
