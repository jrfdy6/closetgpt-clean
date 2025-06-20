import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Forward the request to the backend server
    const response = await fetch(`http://localhost:3001/api/wardrobe/gaps`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(errorData.detail || errorData.message || 'Failed to fetch wardrobe analysis');
    }

    const analysisData = await response.json();
    return NextResponse.json(analysisData);
  } catch (error) {
    console.error("Error fetching wardrobe analysis:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch wardrobe analysis",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 