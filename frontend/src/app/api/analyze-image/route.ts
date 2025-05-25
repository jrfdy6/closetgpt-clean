import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Log the incoming request
    console.log("Received analyze-image request");

    const { imageUrl } = await request.json();
    console.log("Image URL received:", imageUrl);

    if (!imageUrl) {
      console.error("No image URL provided in request");
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    console.log("Making OpenAI API request...");
    console.log("Using model: gpt-4o");
    console.log("Request payload:", {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this clothing item and provide the following information in JSON format:
              {
                "type": "One of: shirt, pants, dress, skirt, jacket, sweater, shoes, accessory, other",
                "subType": "More specific type (e.g., 't-shirt', 'jeans', 'sundress')",
                "dominantColors": [
                  {
                    "name": "Color name",
                    "hex": "Hex color code",
                    "rgb": [R, G, B]
                  }
                ],
                "matchingColors": [
                  {
                    "name": "Color name",
                    "hex": "Hex color code",
                    "rgb": [R, G, B]
                  }
                ],
                "style": ["Array of style tags like: Casual, Formal, Sporty, etc."],
                "brand": "Brand name if visible (or empty string if not visible)",
                "season": ["Array of applicable seasons: spring, summer, fall, winter"],
                "occasion": ["Array of occasions like: Casual, Formal, Business, etc."]
              }
              
              Focus on accuracy and be specific. Consider current fashion trends.`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this clothing item and provide the following information in JSON format:
                {
                  "type": "One of: shirt, pants, dress, skirt, jacket, sweater, shoes, accessory, other",
                  "subType": "More specific type (e.g., 't-shirt', 'jeans', 'sundress')",
                  "dominantColors": [
                    {
                      "name": "Color name",
                      "hex": "Hex color code",
                      "rgb": [R, G, B]
                    }
                  ],
                  "matchingColors": [
                    {
                      "name": "Color name",
                      "hex": "Hex color code",
                      "rgb": [R, G, B]
                    }
                  ],
                  "style": ["Array of style tags like: Casual, Formal, Sporty, etc."],
                  "brand": "Brand name if visible (or empty string if not visible)",
                  "season": ["Array of applicable seasons: spring, summer, fall, winter"],
                  "occasion": ["Array of occasions like: Casual, Formal, Business, etc."]
                }
                
                Focus on accuracy and be specific. Consider current fashion trends.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              },
            ],
          },
        ],
        max_tokens: 1000,
      });

      console.log("OpenAI API response received");
      console.log("Response choices:", response.choices);

      const content = response.choices[0].message.content;
      if (!content) {
        console.error("No content in OpenAI response");
        throw new Error("No response from OpenAI");
      }

      try {
        console.log("Attempting to parse content:", content);
        // Clean the content by removing markdown code block markers
        const cleanedContent = content.replace(/```json\n|\n```/g, '');
        console.log("Cleaned content:", cleanedContent);
        const parsedContent = JSON.parse(cleanedContent);
        console.log("Successfully parsed OpenAI response");

        // Transform the response to match the expected schema
        const transformedContent = {
          ...parsedContent,
          style: Array.isArray(parsedContent.style) ? parsedContent.style : [parsedContent.style],
          brand: parsedContent.brand || "",
          season: Array.isArray(parsedContent.season) ? parsedContent.season : [parsedContent.season],
          occasion: Array.isArray(parsedContent.occasion) ? parsedContent.occasion : [parsedContent.occasion]
        };

        console.log("Transformed content:", transformedContent);
        return NextResponse.json(transformedContent);
      } catch (parseError) {
        console.error("Failed to parse OpenAI response:", parseError);
        console.error("Raw content:", content);
        return NextResponse.json(
          { error: "Invalid response format from OpenAI" },
          { status: 500 }
        );
      }
    } catch (apiError) {
      console.error("OpenAI API error:", apiError);
      if (apiError instanceof Error) {
        console.error("API Error details:", {
          name: apiError.name,
          message: apiError.message,
          stack: apiError.stack
        });
      }
      return NextResponse.json(
        { 
          error: "Failed to analyze image",
          details: apiError instanceof Error ? apiError.message : "Unknown error"
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in analyze-image API:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { 
        error: "Failed to analyze image",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 