import { OpenAIClothingAnalysis } from '../../../../shared/types';
import { validateOpenAIAnalysis } from '../../../../shared/utils';

export const analyzeImage = async (imageUrl: string): Promise<OpenAIClothingAnalysis> => {
  try {
    const response = await fetch('/api/analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    return validateOpenAIAnalysis(data);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}; 