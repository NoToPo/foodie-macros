import { WebhookResponse } from "@/types/nutrition";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

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
  
  // Handle the direct object response format from the webhook
  if (data && data.output) {
    return data as WebhookResponse;
  }
  
  throw new Error('Invalid response format');
};