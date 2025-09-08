import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PhotoUpload } from "@/components/PhotoUpload";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { NutritionResults } from "@/components/NutritionResults";
import { toast } from "@/hooks/use-toast";
import { analyzeMealPhoto } from "@/services/nutritionApi";
import { NutritionData } from "@/types/nutrition";

// SEO: single H1 is inside HeroSection

type AppState = 'upload' | 'analyzing' | 'results';

const Index = () => {
  const [state, setState] = useState<AppState>('upload');
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);

  const handlePhotoSelect = async (file: File) => {
    setSelectedPhoto(file);
    setState('analyzing');
    
    try {
      const response = await analyzeMealPhoto(file);
      
      if (response.output.status === 'success') {
        setNutritionData(response.output);
        setState('results');
        toast({
          title: "Analysis Complete!",
          description: `Found ${response.output.food.length} food items in your meal.`,
        });
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try again with a clearer photo.",
        variant: "destructive",
      });
      setState('upload');
    }
  };

  const handleReset = () => {
    setState('upload');
    setSelectedPhoto(null);
    setNutritionData(null);
  };

  const handleClear = () => {
    setSelectedPhoto(null);
  };

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <HeroSection />
        
        <section className="space-y-6">
          {state === 'upload' && (
            <PhotoUpload
              onPhotoSelect={handlePhotoSelect}
              selectedPhoto={selectedPhoto}
              onClear={handleClear}
            />
          )}
          
          {state === 'analyzing' && <LoadingAnalysis />}
          
          {state === 'results' && nutritionData && (
            <NutritionResults
              data={nutritionData}
              onReset={handleReset}
            />
          )}
        </section>

        <footer className="text-center mt-12 text-muted-foreground text-sm">
          <p>Powered by AI • Results are estimates</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;