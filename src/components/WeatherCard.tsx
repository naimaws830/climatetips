import { Card } from "@/components/ui/card";
import { Cloud, Droplets, Wind } from "lucide-react";
import { WeatherData } from "@/services/weatherService";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className="p-8 bg-card backdrop-blur-sm border-border/50">
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">{weather.city}</h2>
          <p className="text-muted-foreground capitalize">{weather.description}</p>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className="w-32 h-32"
          />
          <div className="text-left">
            <div className="text-7xl font-bold text-foreground">{weather.temp}°</div>
            <p className="text-muted-foreground">Feels like {weather.feels_like}°</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="flex flex-col items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{weather.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{weather.wind_speed} m/s</p>
              <p className="text-xs text-muted-foreground">Wind</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Cloud className="w-5 h-5 text-primary" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{weather.rain || 0} mm</p>
              <p className="text-xs text-muted-foreground">Rain</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
