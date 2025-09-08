import { Loader2, Sparkles, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

export const LoadingAnalysis = () => {
  return (
    <Card className="p-8 bg-gradient-card shadow-soft border-accent/20 text-center animate-scale-in">
      <div className="space-y-6">
        <div className="relative">
          <div className="p-4 bg-gradient-primary rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Brain className="h-8 w-8 text-primary-foreground animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-6 w-6 text-secondary animate-pulse" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Analyzing Your Meal
          </h3>
          <p className="text-muted-foreground mb-4">
            AI is identifying ingredients and calculating nutritional content...
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing image</span>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-gradient-primary h-2 rounded-full animate-pulse w-3/4 transition-all duration-1000"></div>
        </div>
      </div>
    </Card>
  );
};