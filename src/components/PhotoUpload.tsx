import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  selectedPhoto?: File | null;
  onClear?: () => void;
  onRef?: (ref: { triggerCamera: () => void; triggerFileUpload: () => void }) => void;
}

export const PhotoUpload = ({ onPhotoSelect, selectedPhoto, onClear, onRef }: PhotoUploadProps) => {
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

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    // Try to use the MediaDevices API for better camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Create a video element to capture from camera
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        
        // Create a modal to show camera preview
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `;
        
        video.style.cssText = `
          max-width: 90%;
          max-height: 70%;
          border-radius: 8px;
        `;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
          margin-top: 20px;
          display: flex;
          gap: 10px;
        `;
        
        const captureBtn = document.createElement('button');
        captureBtn.textContent = 'Capture Photo';
        captureBtn.style.cssText = `
          padding: 12px 24px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
        `;
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
          padding: 12px 24px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
        `;
        
        const capturePhoto = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context?.drawImage(video, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
              handleFile(file);
            }
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(modal);
          }, 'image/jpeg', 0.8);
        };
        
        const cancelCapture = () => {
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(modal);
        };
        
        captureBtn.onclick = capturePhoto;
        cancelBtn.onclick = cancelCapture;
        
        buttonContainer.appendChild(captureBtn);
        buttonContainer.appendChild(cancelBtn);
        
        modal.appendChild(video);
        modal.appendChild(buttonContainer);
        document.body.appendChild(modal);
      })
      .catch((error) => {
        console.error('Camera access denied:', error);
        // Fallback to file input
        cameraInputRef.current?.click();
      });
    } else {
      // Fallback to file input for older browsers
      cameraInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (onRef) {
      onRef({ triggerCamera, triggerFileUpload });
    }
  }, [onRef]);

  return (
    <section id="analyzer" aria-label="Meal nutrition analyzer">
      <Card className="p-5 sm:p-6 bg-gradient-card shadow-soft border-primary/20 animate-scale-in">
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={previewUrl}
                alt="Selected meal to analyze"
                className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <Button
                onClick={handleClear}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center space-y-2 px-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Ready for analysis</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Click "Analyze" to get nutrition information
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-xl p-6 sm:p-8 md:p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'ring-2 ring-primary bg-gradient-to-br from-primary/5 to-secondary/5 scale-105 shadow-lg' 
                : 'border-2 border-dashed border-muted-foreground/30 bg-gradient-to-br from-background to-muted/20 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 px-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Upload or take a photo
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Supported: JPG, PNG • Max 10MB
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <Button
                  onClick={triggerCamera}
                  variant="cta"
                  size="xl"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Camera className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  Use Camera
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="hero"
                  size="xl"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Upload className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  Upload File
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground px-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>Drag & drop image here</span>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              </div>
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