const OPENWEATHER_API_KEY = "93558f7f6bb6f9ab24e33e8403507199";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  city: string;
  wind_speed: number;
  uv_index?: number;
  rain?: number;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error("City not found");
  }
  
  const data = await response.json();
  
  return {
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    wind_speed: data.wind.speed,
    rain: data.rain?.["1h"] || 0,
  };
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }
  
  const data = await response.json();
  
  return {
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    wind_speed: data.wind.speed,
    rain: data.rain?.["1h"] || 0,
  };
};
