import { addTrend } from "./trendService";
import type { FashionTrend } from "./trendService";

const sampleTrends: Omit<FashionTrend, "id">[] = [
  {
    name: "Quiet Luxury",
    category: "Quiet Luxury",
    subCategories: ["Key Pieces", "Colors", "Patterns"],
    season: "Spring",
    popularity: 0.9,
    description: "Understated elegance with high-quality materials and timeless designs.",
    keyItems: ["Cashmere sweaters", "Tailored trousers", "Minimal accessories"],
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: "Unisex",
    priceRange: "Luxury",
    sustainability: true,
    culturalInfluence: "European minimalism",
    colorPalette: ["Beige", "Cream", "Navy", "Black"],
    fabricTypes: ["Cashmere", "Wool", "Silk", "Cotton"],
  },
  {
    name: "Gorpcore",
    category: "Gorpcore",
    subCategories: ["Key Pieces", "Footwear", "Accessories"],
    season: "Fall",
    popularity: 0.85,
    description: "Outdoor-inspired fashion meets urban style.",
    keyItems: ["Technical jackets", "Hiking boots", "Cargo pants"],
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: "Unisex",
    priceRange: "Mid-Range",
    sustainability: true,
    culturalInfluence: "Outdoor recreation",
    colorPalette: ["Olive", "Black", "Orange", "Blue"],
    fabricTypes: ["Gore-Tex", "Nylon", "Fleece"],
  },
  {
    name: "Dark Academia",
    category: "Dark Academia",
    subCategories: ["Key Pieces", "Colors", "Patterns"],
    season: "Fall",
    popularity: 0.8,
    description: "Intellectual aesthetic with vintage-inspired elements.",
    keyItems: ["Blazers", "Oxford shirts", "Pleated skirts"],
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: "Unisex",
    priceRange: "Mid-Range",
    sustainability: false,
    culturalInfluence: "Academic institutions",
    colorPalette: ["Navy", "Burgundy", "Forest Green", "Brown"],
    fabricTypes: ["Tweed", "Wool", "Cotton", "Leather"],
  },
  {
    name: "Coquette",
    category: "Coquette",
    subCategories: ["Key Pieces", "Colors", "Accessories"],
    season: "Spring",
    popularity: 0.75,
    description: "Feminine and romantic style with vintage touches.",
    keyItems: ["Lace dresses", "Pearl accessories", "Ribbon details"],
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: "Women",
    priceRange: "Mid-Range",
    sustainability: false,
    culturalInfluence: "French fashion",
    colorPalette: ["Pink", "White", "Lavender", "Mint"],
    fabricTypes: ["Lace", "Silk", "Cotton", "Tulle"],
  },
  {
    name: "Cottagecore",
    category: "Cottagecore",
    subCategories: ["Key Pieces", "Patterns", "Accessories"],
    season: "Spring",
    popularity: 0.7,
    description: "Rustic and romantic rural-inspired fashion.",
    keyItems: ["Floral dresses", "Straw hats", "Aprons"],
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: "Women",
    priceRange: "Budget",
    sustainability: true,
    culturalInfluence: "Rural lifestyle",
    colorPalette: ["Sage", "Cream", "Dusty Rose", "Mint"],
    fabricTypes: ["Linen", "Cotton", "Wool", "Lace"],
  },
];

export async function seedTrends() {
  try {
    console.log("Starting to seed trends...");
    for (const trend of sampleTrends) {
      const id = await addTrend(trend);
      console.log(`Added trend: ${trend.name} (ID: ${id})`);
    }
    console.log("Finished seeding trends!");
  } catch (error) {
    console.error("Error seeding trends:", error);
  }
} 