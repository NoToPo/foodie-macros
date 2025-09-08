import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Apple } from "lucide-react";
import { NutritionData } from "@/types/nutrition";

interface NutritionResultsProps {
  data: NutritionData;
  onReset: () => void;
  imageUrl?: string;
}

export const NutritionResults = ({ data, onReset, imageUrl }: NutritionResultsProps) => {
  const macros = [
    { name: "Protein", value: Math.round(data.total.protein * 10) / 10, unit: "g", color: "text-primary", bg: "bg-primary/10" },
    { name: "Carbs", value: Math.round(data.total.carbs * 10) / 10, unit: "g", color: "text-secondary", bg: "bg-secondary/10" },
    { name: "Fat", value: Math.round(data.total.fat * 10) / 10, unit: "g", color: "text-accent-foreground", bg: "bg-accent" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4">
      {/* Image Preview */}
      {imageUrl && (
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/50 shadow-xl border-primary/20 backdrop-blur-sm">
          <div className="text-center space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Analyzed Image
            </h3>
            <div className="relative group">
              <img
                src={imageUrl}
                alt="Analyzed meal"
                className="w-full max-w-md mx-auto h-48 sm:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-sm text-muted-foreground">
              This is the image that was analyzed for nutrition information
            </p>
          </div>
        </Card>
      )}

      {/* Totals Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-card to-card/50 shadow-2xl border-primary/20 backdrop-blur-sm">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Nutrition Analysis
              </h3>
            </div>
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-base sm:text-lg font-bold shadow-lg">
              <span className="text-xl sm:text-2xl mr-2">🔥</span>
              {data.total.calories} calories total
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {macros.map((macro, index) => (
              <div key={macro.name} className={`p-4 sm:p-6 rounded-2xl ${macro.bg} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <div className={`text-2xl sm:text-3xl font-bold ${macro.color} mb-2`}>
                  {macro.value}{macro.unit}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {macro.name}
                </div>
                <div className="mt-2 w-full bg-muted/30 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${macro.color.replace('text-', 'bg-')}`}
                    style={{ width: `${Math.min((macro.value / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Food Breakdown Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-card to-card/50 shadow-2xl border-secondary/20 backdrop-blur-sm">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
              <Apple className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-foreground">
              Food Breakdown
            </h4>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {data.food.map((item, index) => (
              <div
                key={index}
                className="group p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-background/80 to-muted/20 border border-muted/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1 space-y-1 sm:space-y-2">
                    <div className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {item.quantity}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
                    <div className="space-y-1">
                      <div className="text-lg sm:text-2xl font-bold text-primary">{item.calories}</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">calories</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg sm:text-2xl font-bold text-primary">{Math.round(item.protein * 10) / 10}g</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">protein</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg sm:text-2xl font-bold text-secondary">{Math.round(item.carbs * 10) / 10}g</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">carbs</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg sm:text-2xl font-bold text-accent-foreground">{Math.round(item.fat * 10) / 10}g</div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">fat</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center pt-4 px-4">
        <Button 
          onClick={onReset}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
          <span className="font-semibold text-sm sm:text-base">Analyze Another Meal</span>
        </Button>
      </div>
    </div>
  );
};