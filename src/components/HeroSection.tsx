import { ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <header className="text-center space-y-6 mb-8 animate-fade-in">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          <span className="font-playfair">Hill Calories AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary font-semibold">
          Instant meal nutrition from one photo
        </p>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Fast. Accurate. Powered by AI.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <a href="#analyzer">
          <Button variant="hero" size="xl" aria-label="Get started by uploading a photo">
            Get Started
          </Button>
        </a>
        <a href="#analyzer">
          <Button variant="outline" size="xl" aria-label="Use camera to take a photo">
            Try with a Photo
          </Button>
        </a>
      </div>

      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-secondary" />
          <span>Instant results</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-secondary" />
          <span>Private by default</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-secondary" />
          <span>No signup required</span>
        </div>
      </div>
    </header>
  );
};
