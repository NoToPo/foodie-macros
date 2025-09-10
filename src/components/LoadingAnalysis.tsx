import { Loader2, Sparkles, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

export const LoadingAnalysis = () => {
  return (
    <Card className="p-8 sm:p-12 bg-gradient-to-br from-card to-card/50 shadow-2xl border-primary/20 backdrop-blur-sm text-center animate-scale-in mx-4">
      <div className="space-y-6 sm:space-y-8">
        <div className="relative">
          <div className="p-4 sm:p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center shadow-xl">
            <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-secondary animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-ping" />
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 px-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Analyzing Your Meal
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-sm sm:max-w-md mx-auto">
            AI is identifying ingredients and calculating nutritional content...
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary" />
            <span className="font-medium">Processing image</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="w-full bg-muted/30 rounded-full h-2 sm:h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-primary via-secondary to-accent h-2 sm:h-3 rounded-full animate-pulse w-4/5 transition-all duration-2000 shadow-lg"></div>
          </div>
          <div className="flex justify-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </Card>
  );
};