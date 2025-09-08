import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  selectedPhoto?: File | null;
  onClear?: () => void;
}

export const PhotoUpload = ({ onPhotoSelect, selectedPhoto, onClear }: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onPhotoSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    onClear?.();
  };

  return (
    <section id="analyzer" aria-label="Meal nutrition analyzer">
      <Card className="p-5 sm:p-6 bg-gradient-card shadow-soft border-primary/20 animate-scale-in">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Selected meal to analyze"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              onClick={handleClear}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`rounded-lg p-6 sm:p-8 text-center transition-colors duration-200 ${
              dragActive ? 'ring-2 ring-primary bg-accent/50' : 'border border-dashed border-muted-foreground/25 bg-background'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Upload className="h-8 w-8 text-secondary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Upload or take a photo
                </h3>
                <p className="text-muted-foreground text-sm">
                  Supported: JPG, PNG • Max 10MB
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  variant="cta"
                  size="xl"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Use Camera
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="hero"
                  size="xl"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload File
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">Drag & drop image here</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </Card>
    </section>
  );
};