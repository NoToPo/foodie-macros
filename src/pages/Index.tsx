import { useState, useRef } from "react";
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const photoUploadRef = useRef<{ triggerCamera: () => void; triggerFileUpload: () => void } | null>(null);

  const handlePhotoSelect = async (file: File) => {
    setSelectedPhoto(file);
    setState('analyzing');
    
    // Create image URL for preview
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    
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
      // Clean up image URL on error
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
        setImageUrl(null);
      }
    }
  };

  const handleReset = () => {
    setState('upload');
    setSelectedPhoto(null);
    setNutritionData(null);
    // Clean up image URL
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  };

  const handleClear = () => {
    setSelectedPhoto(null);
  };

  const handleTryPhoto = () => {
    // Reset state and trigger camera
    setState('upload');
    setSelectedPhoto(null);
    setNutritionData(null);
    // Clean up image URL
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    // Use setTimeout to ensure PhotoUpload is visible before triggering
    setTimeout(() => {
      photoUploadRef.current?.triggerCamera();
    }, 100);
  };

  const handleGetStarted = () => {
    // Reset state and trigger file upload
    setState('upload');
    setSelectedPhoto(null);
    setNutritionData(null);
    // Clean up image URL
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    // Use setTimeout to ensure PhotoUpload is visible before triggering
    setTimeout(() => {
      photoUploadRef.current?.triggerFileUpload();
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <HeroSection onTryPhoto={handleTryPhoto} onGetStarted={handleGetStarted} />
        
        <section className="space-y-6">
          {/* Always mount PhotoUpload but hide it when not in upload state */}
          <div className={state === 'upload' ? 'block' : 'hidden'}>
            <PhotoUpload
              onPhotoSelect={handlePhotoSelect}
              selectedPhoto={selectedPhoto}
              onClear={handleClear}
              onRef={(ref) => { photoUploadRef.current = ref; }}
            />
          </div>
          
          {state === 'analyzing' && <LoadingAnalysis />}
          
          {state === 'results' && nutritionData && (
            <NutritionResults
              data={nutritionData}
              onReset={handleReset}
              imageUrl={imageUrl || undefined}
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