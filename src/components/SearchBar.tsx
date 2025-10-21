import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, onLocationRequest, loading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10"
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading || !city.trim()}>
        Search
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={onLocationRequest}
        disabled={loading}
      >
        <MapPin className="w-4 h-4" />
      </Button>
    </form>
  );
};
