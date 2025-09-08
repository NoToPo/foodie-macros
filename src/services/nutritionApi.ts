import { WebhookResponse } from "@/types/nutrition";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/meal-ai";

export const analyzeMealPhoto = async (file: File): Promise<WebhookResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  // Handle the array response format from the webhook
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as WebhookResponse;
  }
  
  throw new Error('Invalid response format');
};