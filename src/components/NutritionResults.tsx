import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Apple } from "lucide-react";
import { NutritionData } from "@/types/nutrition";

interface NutritionResultsProps {
  data: NutritionData;
  onReset: () => void;
}

export const NutritionResults = ({ data, onReset }: NutritionResultsProps) => {
  const macros = [
    { name: "Protein", value: Math.round(data.total.protein * 10) / 10, unit: "g", color: "text-primary", bg: "bg-primary/10" },
    { name: "Carbs", value: Math.round(data.total.carbs * 10) / 10, unit: "g", color: "text-secondary", bg: "bg-secondary/10" },
    { name: "Fat", value: Math.round(data.total.fat * 10) / 10, unit: "g", color: "text-accent-foreground", bg: "bg-accent" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Totals Card */}
      <Card className="p-6 bg-gradient-card shadow-soft border-accent/20">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Nutrition Analysis
            </h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {data.total.calories} calories total
            </div>
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
        </div>
      </Card>

      {/* Food Breakdown Card */}
      <Card className="p-6 bg-gradient-card shadow-soft border-accent/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Apple className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-semibold text-foreground">
              Food Breakdown
            </h4>
          </div>

          <div className="space-y-3">
            {data.food.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-muted/50"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.quantity}</div>
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-primary">{item.calories}</div>
                    <div className="text-xs text-muted-foreground">cal</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-primary">{Math.round(item.protein * 10) / 10}g</div>
                    <div className="text-xs text-muted-foreground">protein</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-secondary">{Math.round(item.carbs * 10) / 10}g</div>
                    <div className="text-xs text-muted-foreground">carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-accent-foreground">{Math.round(item.fat * 10) / 10}g</div>
                    <div className="text-xs text-muted-foreground">fat</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reset Button */}
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
  );
};