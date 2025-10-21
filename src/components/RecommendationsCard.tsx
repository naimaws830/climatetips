import { Card } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";

interface RecommendationsCardProps {
  recommendations: string[];
  loading: boolean;
}

export const RecommendationsCard = ({ recommendations, loading }: RecommendationsCardProps) => {
  return (
    <Card className="p-6 bg-card backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-semibold text-foreground">AI Recommendations</h3>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <p className="text-foreground/90 pt-0.5">{rec}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
