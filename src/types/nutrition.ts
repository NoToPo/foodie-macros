export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionData {
  status: string;
  food: FoodItem[];
  total: NutritionTotals;
}

export interface WebhookResponse {
  output: NutritionData;
}