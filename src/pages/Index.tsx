import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { RecommendationsCard } from "@/components/RecommendationsCard";
import { fetchWeatherByCity, fetchWeatherByCoords, WeatherData } from "@/services/weatherService";
import { generateWeatherRecommendations } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";
import { Cloud } from "lucide-react";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const loadWeatherAndRecommendations = async (weatherData: WeatherData) => {
    setWeather(weatherData);
    setAiLoading(true);
    try {
      const recs = await generateWeatherRecommendations(weatherData);
      setRecommendations(recs);
    } catch (error) {
      toast({
        title: "AI recommendations unavailable",
        description: "Showing default recommendations",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleCitySearch = async (city: string) => {
    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      await loadWeatherAndRecommendations(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "City not found. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          await loadWeatherAndRecommendations(data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Unable to fetch weather data",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast({
          title: "Error",
          description: "Unable to retrieve your location",
          variant: "destructive",
        });
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">Climate Tips</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Get real-time weather and AI-powered safety recommendations
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchBar
            onSearch={handleCitySearch}
            onLocationRequest={handleLocationRequest}
            loading={loading}
          />

          {weather && (
            <div className="w-full max-w-2xl space-y-6 animate-in fade-in duration-500">
              <WeatherCard weather={weather} />
              <RecommendationsCard recommendations={recommendations} loading={aiLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
