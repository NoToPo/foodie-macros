import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PhotoUpload } from "@/components/PhotoUpload";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { NutritionResults } from "@/components/NutritionResults";
import { toast } from "sonner";

// SEO: single H1 is inside HeroSection

type AppState = 'upload' | 'analyzing' | 'results';

interface NutritionData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  confidence?: number;
}

const Index = () => {
  const [state, setState] = useState<AppState>('upload');
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);

  const handlePhotoSelect = async (file: File) => {
    setSelectedPhoto(file);
    setState('analyzing');
    
    // Simulate API call - replace with actual POST request
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockData: NutritionData = {
        protein: Math.floor(Math.random() * 30) + 10,
        carbs: Math.floor(Math.random() * 50) + 20,
        fat: Math.floor(Math.random() * 20) + 5,
        calories: Math.floor(Math.random() * 300) + 200,
        confidence: 0.85 + Math.random() * 0.15
      };
      setNutritionData(mockData);
      setState('results');
      toast.success("Analysis complete!");
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error("Analysis failed. Please try again.");
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