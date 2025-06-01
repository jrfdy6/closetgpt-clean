import express from 'express';
import { OpenAI } from 'openai';
import { OutfitGenerationContext, GeneratedOutfit } from '../types/outfit';

const router = express.Router();

// Helper function to format item name
const formatItemName = (item: any) => {
  if (!item) return 'Unknown Item';
  
  const type = item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Unknown Type';
  const color = item.color ? item.color.charAt(0).toUpperCase() + item.color.slice(1) : 'Unknown Color';
  const subType = item.subType ? ` (${item.subType})` : '';
  const description = item.description ? ` - ${item.description}` : '';
  return `${type}${subType} (${color})${description}`;
};

// Helper function to determine formality level
const getFormalityLevel = (item: any) => {
  if (!item || !item.occasion) return 'casual';
  if (item.occasion.includes('Formal') || item.occasion.includes('Business')) return 'formal';
  if (item.occasion.includes('Casual')) return 'casual';
  if (item.occasion.includes('Sport')) return 'sport';
  return 'casual'; // default
};

// Helper function to build the prompt
function buildPrompt(context: OutfitGenerationContext): string {
  const { baseItem, wardrobe, weather, occasion, userProfile, likedOutfits = [], trendingStyles = [] } = context;

  // Format all item names first
  const formattedWardrobe = wardrobe.map(item => ({
    ...item,
    name: formatItemName(item)
  }));

  // Group items by formality
  const formalItems = formattedWardrobe.filter(item => getFormalityLevel(item) === 'formal');
  const casualItems = formattedWardrobe.filter(item => getFormalityLevel(item) === 'casual');
  const sportItems = formattedWardrobe.filter(item => getFormalityLevel(item) === 'sport');

  // Determine occasion formality
  const occasionFormality = occasion.toLowerCase().includes('formal') || 
                           occasion.toLowerCase().includes('business') ? 'formal' :
                           occasion.toLowerCase().includes('sport') ? 'sport' : 'casual';

  return `You are a top-tier fashion assistant for a digital wardrobe app. You must respond ONLY with valid JSON, no other text.

The user has a wardrobe of ${formattedWardrobe.length} items, organized by formality level:

FORMAL ITEMS (${formalItems.length}):
${formalItems.map(item => `- ${item.name} (id: ${item.id})
  Occasions: ${item.occasion?.join(', ') || 'Not specified'}
  Material: ${item.metadata?.visualAttributes?.material || 'Not specified'}
  Pattern: ${item.metadata?.visualAttributes?.pattern || 'Not specified'}
  Fit: ${item.metadata?.visualAttributes?.fit || 'Not specified'}
  Colors: ${item.dominantColors?.map(c => c.name).join(', ') || 'Not specified'}
  Matching Colors: ${item.matchingColors?.map(c => c.name).join(', ') || 'Not specified'}`).join('\n')}

CASUAL ITEMS (${casualItems.length}):
${casualItems.map(item => `- ${item.name} (id: ${item.id})
  Occasions: ${item.occasion?.join(', ') || 'Not specified'}
  Material: ${item.metadata?.visualAttributes?.material || 'Not specified'}
  Pattern: ${item.metadata?.visualAttributes?.pattern || 'Not specified'}
  Fit: ${item.metadata?.visualAttributes?.fit || 'Not specified'}
  Colors: ${item.dominantColors?.map(c => c.name).join(', ') || 'Not specified'}
  Matching Colors: ${item.matchingColors?.map(c => c.name).join(', ') || 'Not specified'}`).join('\n')}

SPORT ITEMS (${sportItems.length}):
${sportItems.map(item => `- ${item.name} (id: ${item.id})
  Occasions: ${item.occasion?.join(', ') || 'Not specified'}
  Material: ${item.metadata?.visualAttributes?.material || 'Not specified'}
  Pattern: ${item.metadata?.visualAttributes?.pattern || 'Not specified'}
  Fit: ${item.metadata?.visualAttributes?.fit || 'Not specified'}
  Colors: ${item.dominantColors?.map(c => c.name).join(', ') || 'Not specified'}
  Matching Colors: ${item.matchingColors?.map(c => c.name).join(', ') || 'Not specified'}`).join('\n')}

They are attending a ${occasion} (${occasionFormality} formality) in ${weather.condition} weather in ${weather.location}. 
Their skin tone is ${userProfile.skinTone || 'not specified'} and their body type is ${userProfile.bodyType || 'not specified'}.
Their style preferences include: ${(userProfile.stylePreferences || []).join(', ') || 'none specified'}.

They tend to like outfits with these styles: ${likedOutfits.join(', ') || 'none specified'}.

Current trending styles include: ${trendingStyles.join(', ') || 'none specified'}.

Your task:
- You MUST ONLY select items from the provided wardrobe list above.
- Pick 3 complementary items from their wardrobe to go with this base item: ${baseItem ? formatItemName(baseItem) : 'any item'}.
- IMPORTANT: Maintain formality consistency. For a ${occasionFormality} occasion, only use ${occasionFormality} items.

Follow these specific rules when creating the outfit:

1. COLOR THEORY RULES:
   - Use complementary colors (opposite on color wheel) for high contrast
   - Use analogous colors (adjacent on color wheel) for harmony
   - Use triadic colors (equidistant on color wheel) for balance
   - Consider the user's skin tone when selecting colors
   - Use neutral colors (black, white, gray, navy) as base colors
   - Limit the outfit to 2-3 main colors plus neutrals

2. MATERIAL COMPATIBILITY RULES:
   - Leather pairs well with: wool, cotton, silk, denim
   - Wool pairs well with: leather, cotton, silk
   - Cotton pairs well with: leather, wool, denim, linen
   - Silk pairs well with: wool, leather, cotton
   - Denim pairs well with: leather, cotton
   - Linen pairs well with: cotton, silk

3. PATTERN MIXING RULES:
   - Solid patterns can be paired with any other pattern
   - Striped patterns work well with: solid, floral, geometric
   - Floral patterns work well with: solid, striped, geometric
   - Plaid patterns work well with: solid, geometric
   - Geometric patterns work well with: solid, striped, floral, plaid
   - Avoid mixing more than 2 patterns in one outfit
   - Keep one pattern dominant and others subtle

4. FIT AND SILHOUETTE RULES:
   - For athletic body types: Use fitted and structured pieces
   - For curvy body types: Use A-line, wrap, and empire styles
   - For rectangular body types: Use belted and layered pieces
   - For hourglass body types: Use fitted and wrap styles
   - For pear body types: Use A-line and empire styles
   - For apple body types: Use A-line and empire styles
   - For inverted triangle body types: Use A-line and wrap styles

5. WEATHER APPROPRIATENESS:
   - For cold weather: Layer with appropriate materials
   - For warm weather: Use breathable fabrics
   - For rainy weather: Include water-resistant pieces
   - For windy weather: Consider structured pieces

You must respond with ONLY a JSON object in this exact format:
{
  "name": "Outfit Name",
  "pieces": [
    {"itemId": "id", "reason": "Detailed explanation of why this piece works, considering material, pattern, fit, and occasion"},
    ...
  ],
  "styleTags": ["style1", "style2"],
  "explanation": "Detailed explanation of the outfit, including how the pieces work together, material compatibility, and weather appropriateness"
}

IMPORTANT: 
1. Only use item IDs that exist in the wardrobe list above.
2. Maintain formality consistency across all selected items.
3. Do not mix formal items with casual or sport items unless specifically appropriate for the occasion.
4. Consider all item attributes (material, pattern, fit) when making selections.`;
}

// Helper function to determine season from weather
function getSeasonFromWeather(weather: { temperature: number }): string {
  const temp = weather.temperature;
  if (temp < 10) return "Winter";
  if (temp < 20) return "Fall";
  if (temp < 30) return "Spring";
  return "Summer";
}

// Generate outfit endpoint
router.post('/generate', async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const context: OutfitGenerationContext = req.body;
    
    // Log the incoming wardrobe items for debugging
    console.log('Incoming wardrobe items:', context.wardrobe.map(item => ({
      id: item.id,
      name: formatItemName(item),
      type: item.type,
      color: item.color,
      occasion: item.occasion
    })));
    
    const prompt = buildPrompt(context);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a fashion expert helping to create outfits. You must respond ONLY with valid JSON, no other text. You must ONLY use items that exist in the provided wardrobe and maintain formality consistency. Each piece must have a valid itemId that exists in the wardrobe list.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', response);
      throw new Error("Invalid response format from OpenAI");
    }

    // Validate that all item IDs exist in the wardrobe
    const validItemIds = new Set(context.wardrobe.map(item => item.id));
    const invalidItems = parsedResponse.pieces.filter((piece: any) => !validItemIds.has(piece.itemId));
    
    if (invalidItems.length > 0) {
      console.error('Invalid items found:', invalidItems);
      console.error('Valid item IDs:', Array.from(validItemIds));
      throw new Error(`Invalid item IDs found in response: ${invalidItems.map((item: any) => item.itemId).join(', ')}`);
    }
    
    // Create a map of wardrobe items for easy lookup
    const wardrobeMap = new Map(context.wardrobe.map(item => [item.id, item]));
    
    // Get the selected items and ensure they have proper names
    const selectedItems = parsedResponse.pieces.map((piece: any) => {
      const item = wardrobeMap.get(piece.itemId);
      if (!item) {
        throw new Error(`Item with ID ${piece.itemId} not found in wardrobe`);
      }
      
      return {
        ...item,
        name: formatItemName(item),
        reason: piece.reason
      };
    });

    // Log the selected items for debugging
    console.log('Selected items:', selectedItems.map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      color: item.color,
      reason: item.reason
    })));
    
    // Create the outfit object
    const outfit: GeneratedOutfit = {
      id: crypto.randomUUID(),
      name: parsedResponse.name,
      description: parsedResponse.explanation,
      items: selectedItems,
      occasion: context.occasion,
      season: getSeasonFromWeather(context.weather),
      style: parsedResponse.styleTags[0],
      styleTags: parsedResponse.styleTags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Log the final outfit for debugging
    console.log('Generated outfit:', {
      name: outfit.name,
      items: outfit.items.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        reason: item.reason
      }))
    });

    res.json(outfit);
  } catch (error) {
    console.error('Error generating outfit:', error);
    res.status(500).json({ 
      error: 'Failed to generate outfit',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 