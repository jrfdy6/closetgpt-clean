"use client";

import { useState } from "react";

interface Outfit {
  id: string;
  items: {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
  }[];
}

export default function OutfitGenerator() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Call OpenAI API to generate outfits
    // For now, using placeholder data
    setTimeout(() => {
      setOutfits([
        {
          id: "1",
          items: [
            {
              id: "1",
              name: "Blue T-Shirt",
              category: "Tops",
              imageUrl: "/placeholder.jpg",
            },
            {
              id: "2",
              name: "Black Jeans",
              category: "Bottoms",
              imageUrl: "/placeholder.jpg",
            },
          ],
        },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="business">Business</option>
          <option value="sporty">Sporty</option>
        </select>

        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
        >
          <option value="all">All Styles</option>
          <option value="minimalist">Minimalist</option>
          <option value="vintage">Vintage</option>
          <option value="modern">Modern</option>
          <option value="bohemian">Bohemian</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Outfits"}
        </button>
      </div>

      {outfits.length > 0 ? (
        <div>
          {outfits.map((outfit) => (
            <div key={outfit.id}>
              <h3>Outfit Suggestion</h3>
              <div>
                {outfit.items.map((item) => (
                  <div key={item.id}>
                    <div>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>
            Select your preferences and click "Generate Outfits" to get started
          </p>
        </div>
      )}
    </div>
  );
} 