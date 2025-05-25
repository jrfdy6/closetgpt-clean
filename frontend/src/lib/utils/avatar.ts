// DiceBear API base URL
const DICEBEAR_API = "https://api.dicebear.com/7.x";

// Map our skin tones to DiceBear skin colors
const SKIN_TONE_MAP = {
  light: "f5d0a9",
  "medium-light": "e6c7a9",
  medium: "d4b483",
  "medium-dark": "b38b6d",
  dark: "8b5a2b",
  deep: "5c4033",
};

// Map our body types to DiceBear styles
const BODY_TYPE_STYLES = {
  // Female styles
  female: {
    hourglass: "adventurer",
    pear: "adventurer",
    apple: "adventurer",
    rectangle: "adventurer",
    "inverted-triangle": "adventurer",
    petite: "adventurer",
    tall: "adventurer",
    "plus-curvy": "adventurer",
    "lean-column": "adventurer",
  },
  // Male styles
  male: {
    rectangle: "adventurer",
    triangle: "adventurer",
    "inverted-triangle": "adventurer",
    oval: "adventurer",
    trapezoid: "adventurer",
    slim: "adventurer",
    stocky: "adventurer",
    tall: "adventurer",
    short: "adventurer",
  },
};

// Hair style options for each gender
const HAIR_STYLES = {
  female: [
    { id: "long-straight", label: "Long Straight", value: "long01" },
    { id: "long-wavy", label: "Long Wavy", value: "long02" },
    { id: "medium-straight", label: "Medium Straight", value: "medium01" },
    { id: "medium-wavy", label: "Medium Wavy", value: "medium02" },
    { id: "short-straight", label: "Short Straight", value: "short01" },
    { id: "short-wavy", label: "Short Wavy", value: "short02" },
    { id: "bob", label: "Bob", value: "bob01" },
    { id: "pixie", label: "Pixie", value: "pixie01" },
  ],
  male: [
    { id: "short-classic", label: "Short Classic", value: "short01" },
    { id: "short-messy", label: "Short Messy", value: "short02" },
    { id: "medium-straight", label: "Medium Straight", value: "medium01" },
    { id: "medium-wavy", label: "Medium Wavy", value: "medium02" },
    { id: "long-straight", label: "Long Straight", value: "long01" },
    { id: "long-wavy", label: "Long Wavy", value: "long02" },
    { id: "buzz", label: "Buzz Cut", value: "buzz01" },
    { id: "fade", label: "Fade", value: "fade01" },
  ],
};

// Hair color options
const HAIR_COLORS = [
  { id: "black", label: "Black", value: "000000" },
  { id: "brown-dark", label: "Dark Brown", value: "3c2a21" },
  { id: "brown-medium", label: "Medium Brown", value: "6b4423" },
  { id: "brown-light", label: "Light Brown", value: "a67c52" },
  { id: "blonde-dark", label: "Dark Blonde", value: "b88b4a" },
  { id: "blonde-light", label: "Light Blonde", value: "e6c99f" },
  { id: "red", label: "Red", value: "a55728" },
  { id: "gray", label: "Gray", value: "808080" },
];

interface AvatarOptions {
  gender: "female" | "male";
  bodyType: string;
  skinTone: keyof typeof SKIN_TONE_MAP;
  hairStyle?: string;
  hairColor?: string;
  seed?: string;
}

export function generateAvatarUrl({ 
  gender, 
  bodyType, 
  skinTone, 
  hairStyle = gender === "female" ? "long01" : "short01",
  hairColor = "3c2a21",
  seed 
}: AvatarOptions): string {
  const style = BODY_TYPE_STYLES[gender][bodyType as keyof typeof BODY_TYPE_STYLES[typeof gender]];
  const skinColor = SKIN_TONE_MAP[skinTone];
  
  // Use a combination of gender, body type, and skin tone as the seed if not provided
  const avatarSeed = seed || `${gender}-${bodyType}-${skinTone}-${hairStyle}-${hairColor}`;
  
  // Construct the DiceBear URL with our parameters
  const url = new URL(`${DICEBEAR_API}/${style}/svg`);
  url.searchParams.append("seed", avatarSeed);
  url.searchParams.append("backgroundColor", "transparent");
  url.searchParams.append("skin", skinColor);
  
  // Add gender-specific parameters
  if (gender === "female") {
    url.searchParams.append("hair", hairStyle);
    url.searchParams.append("hairColor", hairColor);
    url.searchParams.append("clothing", "variant01");
    url.searchParams.append("clothingColor", "3c4f5c");
  } else {
    url.searchParams.append("hair", hairStyle);
    url.searchParams.append("hairColor", hairColor);
    url.searchParams.append("clothing", "variant02");
    url.searchParams.append("clothingColor", "3c4f5c");
  }

  return url.toString();
}

// Export the hair style and color options
export { HAIR_STYLES, HAIR_COLORS };

// Helper function to get all possible avatar combinations
export function getAllAvatarCombinations() {
  const combinations: AvatarOptions[] = [];
  
  // Female combinations
  Object.keys(BODY_TYPE_STYLES.female).forEach((bodyType) => {
    Object.keys(SKIN_TONE_MAP).forEach((skinTone) => {
      combinations.push({
        gender: "female",
        bodyType,
        skinTone: skinTone as keyof typeof SKIN_TONE_MAP,
      });
    });
  });
  
  // Male combinations
  Object.keys(BODY_TYPE_STYLES.male).forEach((bodyType) => {
    Object.keys(SKIN_TONE_MAP).forEach((skinTone) => {
      combinations.push({
        gender: "male",
        bodyType,
        skinTone: skinTone as keyof typeof SKIN_TONE_MAP,
      });
    });
  });
  
  return combinations;
} 