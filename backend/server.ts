import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/recommendations', async (req, res) => {
  const { weather } = req.body;
  
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
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const recommendations = data.choices[0].message.content
      .split('\n')
      .filter(tip => tip.trim());

    res.json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});