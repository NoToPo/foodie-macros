import { Sparkles, Camera } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="text-center space-y-6 mb-8">
      <div className="relative inline-flex items-center justify-center">
        <div className="p-4 bg-gradient-primary rounded-full shadow-strong">
          <Camera className="h-12 w-12 text-primary-foreground" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Hill Calories
          <span className="block text-primary">AI</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Snap a photo of your meal and instantly get detailed nutrition information powered by AI
        </p>
      </div>
    </div>
  );
};