import type { OpenAIClothingAnalysis } from "@shared/types";

export async function analyzeClothingImage(imageUrl: string): Promise<OpenAIClothingAnalysis> {
  try {
    console.log("Sending image for analysis:", imageUrl);
    
    const response = await fetch('/api/analyze-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data
      });
      throw new Error(data.error || data.details || 'Failed to analyze image');
    }

    console.log("Successfully received analysis:", data);
    return data;
  } catch (error) {
    console.error("Error analyzing image:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function analyzeMultipleImages(imageUrls: string[]): Promise<OpenAIClothingAnalysis[]> {
  console.log("Analyzing multiple images:", imageUrls);
  const analysisPromises = imageUrls.map(url => analyzeClothingImage(url));
  return Promise.all(analysisPromises);
} 