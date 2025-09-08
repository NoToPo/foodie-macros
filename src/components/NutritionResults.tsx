import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface NutritionData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  confidence?: number;
}

interface NutritionResultsProps {
  data: NutritionData;
  onReset: () => void;
}

export const NutritionResults = ({ data, onReset }: NutritionResultsProps) => {
  const macros = [
    { name: "Protein", value: data.protein, unit: "g", color: "text-primary", bg: "bg-primary/10" },
    { name: "Carbs", value: data.carbs, unit: "g", color: "text-secondary", bg: "bg-secondary/10" },
    { name: "Fat", value: data.fat, unit: "g", color: "text-accent-foreground", bg: "bg-accent" },
  ];

  return (
    <Card className="p-6 bg-gradient-card shadow-soft border-accent/20">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Nutrition Analysis
          </h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {data.calories} calories
          </div>
          {data.confidence && (
            <p className="text-muted-foreground text-sm mt-2">
              Confidence: {Math.round(data.confidence * 100)}%
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {macros.map((macro) => (
            <div key={macro.name} className={`p-4 rounded-lg ${macro.bg} text-center`}>
              <div className={`text-2xl font-bold ${macro.color} mb-1`}>
                {macro.value}{macro.unit}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {macro.name}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onReset}
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 transition-smooth"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Analyze Another Meal
          </Button>
        </div>
      </div>
    </Card>
  );
};