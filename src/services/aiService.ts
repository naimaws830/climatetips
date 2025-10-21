import { WeatherData } from "./weatherService";

// ⚠️ SECURITY WARNING: API key exposed client-side - for demo only
// For production, move to backend/edge function
const OPENROUTER_API_KEY = "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";

export const generateWeatherRecommendations = async (weather: WeatherData): Promise<string[]> => {
  const prompt = `Based on the following weather conditions, provide exactly 3 short, practical safety and comfort tips (each 10-15 words):

Temperature: ${weather.temp}°C (feels like ${weather.feels_like}°C)
Humidity: ${weather.humidity}%
Conditions: ${weather.description}
Wind: ${weather.wind_speed} m/s
Rain: ${weather.rain || 0} mm

Return only the 3 tips, one per line, no numbering or extra text.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Split by newlines and filter out empty lines
    return content.split('\n').filter((line: string) => line.trim()).slice(0, 3);
  } catch (error) {
    console.error("AI recommendation error:", error);
    return [
      "Stay hydrated and dress appropriately for the weather",
      "Check weather updates before planning outdoor activities",
      "Keep emergency supplies handy for weather changes"
    ];
  }
};
