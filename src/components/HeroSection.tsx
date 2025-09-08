import { ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onTryPhoto?: () => void;
  onGetStarted?: () => void;
}

export const HeroSection = ({ onTryPhoto, onGetStarted }: HeroSectionProps) => {
  return (
    <header className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12 animate-fade-in px-4">
      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
             <span className="font-playfair bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
               Hill Calories AI
             </span>
           </h1>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xl sm:text-2xl md:text-3xl text-primary font-bold px-2">
            Instant meal nutrition from one photo
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2">
            Fast. Accurate. Powered by AI. Get detailed nutrition analysis in seconds.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
        <Button 
          variant="hero" 
          size="xl" 
          aria-label="Get started by uploading a photo"
          onClick={onGetStarted}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>
        <Button 
          variant="outline" 
          size="xl" 
          aria-label="Use camera to take a photo"
          onClick={onTryPhoto}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
        >
          Try with a Photo
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm px-2 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary/10 rounded-full flex-shrink-0">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
          <span className="font-medium whitespace-nowrap">Instant results</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/10 rounded-full flex-shrink-0">
          <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          <span className="font-medium whitespace-nowrap">Private by default</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full flex-shrink-0">
          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
          <span className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">No signup required</span>
        </div>
      </div>
    </header>
  );
};
